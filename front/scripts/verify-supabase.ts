import fs from "fs"
import path from "path"
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

const checkEnvFile = () => {
    const envPath = path.resolve(process.cwd(), ".env")
    if (!fs.existsSync(envPath)) {
        console.error("❌ Error: .env file not found")
        console.log("Please create a .env file in the project root directory.")
        process.exit(1)
    }
    console.log("✅ .env file found")
}

const checkEnvVariables = () => {
    const requiredVars = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"]
    const missingVars = requiredVars.filter((varName) => !process.env[varName])

    if (missingVars.length > 0) {
        console.error("❌ Error: Missing environment variables:")
        missingVars.forEach((varName) => console.log(`   - ${varName}`))
        process.exit(1)
    }
    console.log("✅ Environment variables verified")
}

const verifySupabaseConnection = async () => {
    try {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        // Simple test query to check connection
        const { error: testError } = await supabase.from("users").select("*").limit(1)
        if (testError) throw testError

        console.log("✅ Supabase connection established")

        const requiredTables = ["users", "books", "library", "loans"]
        for (const table of requiredTables) {
            const { error: tableError } = await supabase.from(table).select("*").limit(1)
            if (tableError) {
                console.error(`❌ Error: Table '${table}' does not exist or is not accessible`)
                console.log(
                    `Please run the SQL scripts provided in the documentation to create the '${table}' table`
                )
                process.exit(1)
            }
            console.log(`✅ Table '${table}' verified`)
        }
    } catch (error: any) {
        console.error("❌ Error connecting to Supabase:")
        console.error(error.message)
        process.exit(1)
    }
}

const main = async () => {
    console.log("🔍 Starting Supabase configuration verification...\n")

    dotenv.config()

    checkEnvFile()
    checkEnvVariables()
    await verifySupabaseConnection()

    console.log("\n✅ Verification completed successfully")
    console.log("Your Supabase configuration is ready to use")
}

main().catch((error) => {
    console.error("Unexpected error:", error)
    process.exit(1)
})
