import { supabase } from "../lib/supabaseClient"

// Función para registrar un usuario
export async function registerUser(email: string, password: string, username: string, admin: boolean) {
    try {
        // Paso 1: Registrar el usuario en Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        })

        if (authError) {
            throw new Error(`Error en el registro: ${authError.message}`)
        }

        const userId = authData?.user?.id
        if (!userId) {
            throw new Error("No se pudo obtener el ID del usuario.")
        }

        // Paso 2: Guardar los datos adicionales en la tabla `users`
        const { data: userData, error: userError } = await supabase
            .from("users")
            .insert({
                id: userId,
                username,
                email,
                admin,
                created_at: new Date().toISOString(),
            })
            .select("id, username, email, admin, created_at") // Selecciona los campos necesarios
            .single()

        if (userError) {
            throw new Error(`Error al guardar los datos adicionales: ${userError.message}`)
        }

        return { user: userData } // Devuelve los datos del usuario
    } catch (error) {
        console.error(error)
        throw new Error("Hubo un problema durante el registro.")
    }
}

// Función para iniciar sesión
export async function loginUser(email: string, password: string) {
    try {
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (authError) {
            throw new Error(`Error al iniciar sesión: ${authError.message}`)
        }

        const userId = authData?.user?.id
        if (!userId) {
            throw new Error("No se pudo obtener el ID del usuario.")
        }

        const { data: userData, error: userError } = await supabase
            .from("users")
            .select("id, username, email, admin, created_at") // Selecciona el campo `created_at`
            .eq("id", userId)
            .single()

        if (userError) {
            throw new Error(`Error al obtener los datos del usuario: ${userError.message}`)
        }

        return { user: userData } // Devuelve los datos del usuario
    } catch (error) {
        console.error(error)
        throw new Error("Hubo un problema durante el inicio de sesión.")
    }
}

// Función para cerrar sesión
export async function logoutUser() {
    const { error } = await supabase.auth.signOut()

    if (error) {
        throw new Error(`Error al cerrar sesión: ${error.message}`)
    }

    return "Sesión cerrada correctamente."
}
