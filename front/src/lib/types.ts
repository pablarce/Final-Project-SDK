// Representa los datos de la tabla `Library`
export type Library = {
    id: string
    book_id: string
    quantity: number
}

// Representa los datos de la tabla `Book`
export type Book = {
    id: string
    created_at: string // Timestamp en formato ISO
    name: string
    author: string
    genre: string
    publication_date: string // Timestamp en formato ISO
}

export type LibraryBook = Library & Book

export type Loan = {
    id: number
    book_id: number
    user_id: string
    quantity: number
    status: string
    start_date: string // ISO timestamp
    end_date: string // ISO timestamp
    book_name: string
    author: string
    genre: string
    username: string
    email: string
}
