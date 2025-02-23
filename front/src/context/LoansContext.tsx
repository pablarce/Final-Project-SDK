import React, { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"

import { createLoan, fetchLoans } from "@/services/loans"
import { Loan } from "@/lib/types"

interface LoansContextType {
    loans: Loan[] // Lista de préstamos
    loading: boolean // Estado de carga
    error: string | null // Estado de error
    refetchLoans: () => void // Función para refrescar préstamos
    addLoan: (bookId: number, quantity: number, startDate: string, endDate: string) => Promise<void> // Crear préstamo
}

const LoansContext = createContext<LoansContextType | undefined>(undefined)

export const LoansProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loans, setLoans] = useState<Loan[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const { user } = useAuth() // Usuario actual autenticado

    // Cargar préstamos desde la base de datos
    const loadLoans = async () => {
        if (!user) return

        setLoading(true)
        setError(null)
        try {
            const data = await fetchLoans(user.admin, user.id) // Pasamos admin y userId
            setLoans(data)
        } catch (err: any) {
            setError(err.message || "Error al cargar los préstamos.")
        } finally {
            setLoading(false)
        }
    }

    // Añadir un nuevo préstamo
    const addLoan = async (bookId: number, quantity: number, startDate: string, endDate: string) => {
        if (!user) {
            throw new Error("Usuario no autenticado.")
        }
        setLoading(true)
        try {
            await createLoan(bookId, quantity, startDate, endDate, user.id)
            await loadLoans() // Recargar préstamos después de crear uno nuevo
        } catch (err: any) {
            setError(err.message || "Error al crear el préstamo.")
            throw err // Re-lanza el error para manejarlo en el componente
        } finally {
            setLoading(false)
        }
    }

    // Cargar préstamos al montar el contexto
    useEffect(() => {
        loadLoans()
    }, [user]) // Re-cargar cuando el usuario cambie

    return (
        <LoansContext.Provider value={{ loans, loading, error, refetchLoans: loadLoans, addLoan }}>
            {children}
        </LoansContext.Provider>
    )
}

export const useLoans = (): LoansContextType => {
    const context = useContext(LoansContext)
    if (!context) {
        throw new Error("useLoans debe usarse dentro de un LoansProvider")
    }
    return context
}
