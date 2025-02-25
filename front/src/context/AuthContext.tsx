import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"

import { supabase } from "../lib/supabaseClient"
import { loginUser, logoutUser, registerUser } from "../services/users"

interface User {
    id: string
    email: string
    username: string
    admin: boolean
    created_at: string
}

interface AuthContextType {
    isAuthenticated: boolean
    user: User | null
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string, username: string, admin: boolean) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)

    // Recover user state when loading the page
    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession()

            if (data?.session) {
                const userId = data.session.user.id

                // Get user data from database
                const { data: userData, error } = await supabase
                    .from("users")
                    .select("id, username, email, admin, created_at")
                    .eq("id", userId)
                    .single()

                if (!error && userData) {
                    setUser(userData)
                }
            }
        }

        checkSession()
    }, [])

    const login = async (email: string, password: string) => {
        try {
            const { user: userData } = await loginUser(email, password)
            setUser(userData) // Save user data in state
        } catch (error) {
            console.error("Login error:", error)
            throw error
        }
    }

    const register = async (email: string, password: string, username: string, admin: boolean) => {
        try {
            const { user: userData } = await registerUser(email, password, username, admin)
            setUser(userData)
        } catch (error) {
            console.error("Registration error:", error)
            throw error
        }
    }

    const logout = async () => {
        try {
            await logoutUser()
            setUser(null) // Clear user state
        } catch (error) {
            console.error("Logout error:", error)
            throw error
        }
    }

    const isAuthenticated = !!user

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
