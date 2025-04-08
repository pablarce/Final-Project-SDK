import { supabase } from "../lib/supabaseClient"

// Function to register a user
export async function registerUser(email: string, password: string, username: string, admin: boolean) {
    try {
        // Step 1: Register the user in Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        })

        if (authError) {
            throw new Error(`Registration error: ${authError.message}`)
        }

        const userId = authData?.user?.id
        if (!userId) {
            throw new Error("Could not get user ID.")
        }

        // Step 2: Save additional data in the `users` table
        const { data: userData, error: userError } = await supabase
            .from("users")
            .insert({
                id: userId,
                username,
                email,
                admin,
                created_at: new Date().toISOString(),
            })
            .select("id, username, email, admin, created_at") // Select necessary fields
            .single()

        if (userError) {
            throw new Error(`Error saving additional data: ${userError.message}`)
        }

        return { user: userData } // Return user data
    } catch (error) {
        console.error(error)
        throw new Error("There was a problem during registration.")
    }
}

// Function to log in
export async function loginUser(email: string, password: string) {
    try {
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (authError) {
            throw new Error(`Login error: ${authError.message}`)
        }

        const userId = authData?.user?.id
        if (!userId) {
            throw new Error("Could not get user ID.")
        }

        const { data: userData, error: userError } = await supabase
            .from("users")
            .select("id, username, email, admin, created_at") // Select the `created_at` field
            .eq("id", userId)
            .single()

        if (userError) {
            throw new Error(`Error getting user data: ${userError.message}`)
        }

        return { user: userData } // Return user data
    } catch (error) {
        console.error(error)
        throw new Error("There was a problem during login.")
    }
}

// Function to log out
export async function logoutUser() {
    const { error } = await supabase.auth.signOut()

    if (error) {
        throw new Error(`Error logging out: ${error.message}`)
    }

    return "Successfully logged out."
}
