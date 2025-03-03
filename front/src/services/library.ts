// @ts-nocheck
// @ts-ignore

import { supabase } from "@/lib/supabaseClient"
import { LibraryBook } from "@/lib/types" // Importa el tipo existente

// Función para obtener la información combinada de library y books
export const fetchLibraryData = async (): Promise<LibraryBook[]> => {
    const { data, error } = await supabase
        .from("library")
        .select(
            `
      id,
      book_id,
      quantity,
      books:books (
        created_at,
        name,
        author,
        genre,
        publication_date
      )
    `
        )
        .order("id", { ascending: true })

    if (error) {
        console.error("Error fetching library data:", error.message)
        throw error
    }

    // Transformar los datos para aplanar la estructura
    const formattedData: LibraryBook[] = data.map((entry) => ({
        id: entry.id,
        book_id: entry.book_id,
        quantity: entry.quantity,
        created_at: entry.books.created_at,
        name: entry.books.name,
        author: entry.books.author,
        genre: entry.books.genre,
        publication_date: entry.books.publication_date,
    }))

    return formattedData
}

// Función para crear un nuevo libro
export const createBook = async (bookData: {
    name: string
    author: string
    genre: string
    publication_date: string
    quantity: number
}): Promise<LibraryBook> => {
    // Paso 1: Crear el libro en la tabla books
    const { data: bookInsert, error: bookError } = await supabase
        .from("books")
        .insert({
            name: bookData.name,
            author: bookData.author,
            genre: bookData.genre,
            publication_date: bookData.publication_date,
        })
        .select("id")
        .single()

    if (bookError) {
        console.error("Error al crear libro:", bookError.message)
        throw bookError
    }

    // Paso 2: Crear la entrada en la tabla library
    const { data: libraryInsert, error: libraryError } = await supabase
        .from("library")
        .insert({
            book_id: bookInsert.id,
            quantity: bookData.quantity,
        })
        .select("id")
        .single()

    if (libraryError) {
        console.error("Error al agregar libro a la biblioteca:", libraryError.message)
        throw libraryError
    }

    // Obtener y devolver el libro completo
    return await fetchBookById(libraryInsert.id)
}

// Función auxiliar para obtener un libro por su ID
export const fetchBookById = async (id: number): Promise<LibraryBook> => {
    const { data, error } = await supabase
        .from("library")
        .select(
            `
            id,
            book_id,
            quantity,
            books:books (
                created_at,
                name,
                author,
                genre,
                publication_date
            )
        `
        )
        .eq("id", id)
        .single()

    if (error) {
        throw error
    }

    return {
        id: data.id,
        book_id: data.book_id,
        quantity: data.quantity,
        created_at: data.books.created_at,
        name: data.books.name,
        author: data.books.author,
        genre: data.books.genre,
        publication_date: data.books.publication_date,
    }
}

// Función para actualizar un libro existente
export const updateBook = async (
    libraryId: string,
    bookData: {
        name?: string
        author?: string
        genre?: string
        publication_date?: string
        quantity?: number
    }
): Promise<LibraryBook> => {
    // Primero obtenemos los datos actuales del libro
    const { data: currentData, error: fetchError } = await supabase
        .from("library")
        .select(
            `
            id,
            book_id,
            quantity,
            books:books (
                id,
                name,
                author,
                genre,
                publication_date
            )
        `
        )
        .eq("id", libraryId)
        .single()

    if (fetchError) {
        console.error("Error al obtener datos del libro:", fetchError.message)
        throw fetchError
    }

    // Separamos los datos que van a cada tabla
    const bookId = currentData.book_id
    const bookUpdates: any = {}
    const libraryUpdates: any = {}

    // Preparamos las actualizaciones para la tabla books
    if (bookData.name !== undefined) bookUpdates.name = bookData.name
    if (bookData.author !== undefined) bookUpdates.author = bookData.author
    if (bookData.genre !== undefined) bookUpdates.genre = bookData.genre
    if (bookData.publication_date !== undefined) bookUpdates.publication_date = bookData.publication_date

    // Preparamos las actualizaciones para la tabla library
    if (bookData.quantity !== undefined) libraryUpdates.quantity = bookData.quantity

    // Actualizamos la tabla books si hay cambios
    if (Object.keys(bookUpdates).length > 0) {
        const { error: bookError } = await supabase.from("books").update(bookUpdates).eq("id", bookId)

        if (bookError) {
            console.error("Error al actualizar libro:", bookError.message)
            throw bookError
        }
    }

    // Actualizamos la tabla library si hay cambios
    if (Object.keys(libraryUpdates).length > 0) {
        const { error: libraryError } = await supabase.from("library").update(libraryUpdates).eq("id", libraryId)

        if (libraryError) {
            console.error("Error al actualizar cantidad en biblioteca:", libraryError.message)
            throw libraryError
        }
    }

    // Obtenemos y devolvemos el libro actualizado
    return await fetchBookById(libraryId)
}
