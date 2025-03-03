import React, { createContext, useContext, useEffect, useState } from "react"

import {
    createBook as createBookService,
    fetchLibraryData,
    updateBook as updateBookService,
} from "@/services/library"
import { LibraryBook } from "@/lib/types"

// Tipo para el contexto
interface LibraryContextType {
    libraryData: LibraryBook[] | null
    loading: boolean
    error: string | null
    refetch: () => void // Función para recargar los datos
    idSelected: string
    setIdSelected: React.Dispatch<React.SetStateAction<string>>
    createBook: (bookData: {
        name: string
        author: string
        genre: string
        publication_date: string
        quantity: number
    }) => Promise<void>
    updateBook: (
        libraryId: string,
        bookData: {
            name?: string
            author?: string
            genre?: string
            publication_date?: string
            quantity?: number
        }
    ) => Promise<void>
}

// Contexto de la librería
const LibraryContext = createContext<LibraryContextType | undefined>(undefined)

// Proveedor del contexto
export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [libraryData, setLibraryData] = useState<LibraryBook[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const [idSelected, setIdSelected] = useState<string>("-1")

    // Función para obtener los datos
    const loadLibraryData = async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await fetchLibraryData()
            setLibraryData(data)
        } catch (err: any) {
            setError(err.message || "Error fetching data")
        } finally {
            setLoading(false)
        }
    }

    // Función para crear un nuevo libro
    const createBook = async (bookData: {
        name: string
        author: string
        genre: string
        publication_date: string
        quantity: number
    }) => {
        setLoading(true)
        setError(null)
        try {
            await createBookService(bookData)
            // Reload data after creating the book
            await loadLibraryData()
        } catch (err: any) {
            setError(err.message || "Error creating the book")
            throw err
        } finally {
            setLoading(false)
        }
    }

    // Función para actualizar un libro existente
    const updateBook = async (
        libraryId: string,
        bookData: {
            name?: string
            author?: string
            genre?: string
            publication_date?: string
            quantity?: number
        }
    ) => {
        setLoading(true)
        setError(null)
        try {
            await updateBookService(libraryId, bookData)
            // Reload data after updating the book
            await loadLibraryData()
        } catch (err: any) {
            setError(err.message || "Error updating the book")
            throw err
        } finally {
            setLoading(false)
        }
    }

    // Efecto para cargar los datos al iniciar
    useEffect(() => {
        loadLibraryData()
    }, [])

    return (
        <LibraryContext.Provider
            value={{
                libraryData,
                loading,
                error,
                refetch: loadLibraryData,
                idSelected,
                setIdSelected,
                createBook,
                updateBook,
            }}
        >
            {children}
        </LibraryContext.Provider>
    )
}

// Hook personalizado para usar el contexto
export const useLibrary = () => {
    const context = useContext(LibraryContext)
    if (!context) {
        throw new Error("useLibrary must be used within a LibraryProvider")
    }
    return context
}
