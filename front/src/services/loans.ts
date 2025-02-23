// @ts-nocheck
// @ts-ignore

import { supabase } from "@/lib/supabaseClient"
import { Loan } from "@/lib/types"

// Obtener todos los préstamos con información del libro y usuario
export const fetchLoans = async (admin: boolean, userId: string): Promise<Loan[]> => {
    let query = supabase
        .from("loans")
        .select(
            `
            id,
            book_id,
            user_id,
            quantity,
            status,
            start_date,
            end_date,
            books:books (name, author, genre),
            users:users (username, email)
        `
        )
        .order("start_date", { ascending: false })

    // Si no es admin, filtrar solo los préstamos del usuario actual
    if (!admin) {
        query = query.eq("user_id", userId)
    }

    const { data, error } = await query

    if (error) {
        console.error("Error al obtener los préstamos:", error.message)
        throw new Error(error.message)
    }

    return data.map((loan) => ({
        id: loan.id,
        book_id: loan.book_id,
        user_id: loan.user_id,
        quantity: loan.quantity,
        status: loan.status,
        start_date: loan.start_date,
        end_date: loan.end_date,
        book_name: loan.books.name,
        author: loan.books.author,
        genre: loan.books.genre,
        username: loan.users.username,
        email: loan.users.email,
    }))
}

// Crear un nuevo préstamo (verificar cantidad y actualizar library)
export const createLoan = async (
    bookId: number,
    quantity: number,
    startDate: string,
    endDate: string,
    userId: string
) => {
    // Paso 1: Verificar la cantidad disponible en la librería
    const { data: libraryData, error: libraryError } = await supabase
        .from("library")
        .select("quantity")
        .eq("book_id", bookId)
        .single()

    if (libraryError || !libraryData) {
        console.error("Error al verificar la cantidad en la librería:", libraryError?.message)
        throw new Error("No se pudo verificar la disponibilidad del libro.")
    }

    const availableQuantity = libraryData.quantity

    if (availableQuantity < quantity) {
        // Si no hay suficientes libros disponibles, lanzar un warning
        throw new Error(
            `No hay suficientes copias disponibles. Disponibles: ${availableQuantity}, Solicitadas: ${quantity}`
        )
    }

    // Paso 2: Crear el préstamo
    const { data: loanData, error: loanError } = await supabase
        .from("loans")
        .insert({
            book_id: bookId,
            user_id: userId,
            quantity,
            status: "pending",
            start_date: startDate,
            end_date: endDate,
        })
        .select()
        .single()

    if (loanError) {
        console.error("Error al crear el préstamo:", loanError.message)
        throw new Error("Error al crear el préstamo.")
    }

    // Paso 3: Actualizar la cantidad en la librería
    const newQuantity = availableQuantity - quantity

    const { error: updateError } = await supabase
        .from("library")
        .update({ quantity: newQuantity })
        .eq("book_id", bookId)

    if (updateError) {
        console.error("Error al actualizar la cantidad en la librería:", updateError.message)
        throw new Error("Error al actualizar la cantidad de libros en la librería.")
    }

    return loanData
}
