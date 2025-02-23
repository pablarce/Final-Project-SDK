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
