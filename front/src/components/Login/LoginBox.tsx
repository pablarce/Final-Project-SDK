import React, { useState } from "react"
//import { useAuth } from "@/context/AuthContext"
import Paths from "@/router/paths"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeClosed, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button/Button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/Form/Form"
import { Input } from "@/components/ui/Input/Input"

const formSchema = z.object({
    email: z
        .string()
        .email({ message: "Must be a valid email." })
        .min(2, { message: "Email must be at least 2 characters." })
        .max(50, { message: "Email cannot exceed 50 characters." }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." })
        .max(100, { message: "Password cannot exceed 100 characters." }),
})

interface LoginFormInputs {
    email: string
    password: string
}

interface LoginBoxProps {
    setIsLoginPage: (isLoginPage: boolean) => void
    className?: string
}

const LoginBox: React.FC<LoginBoxProps> = ({ setIsLoginPage, className }) => {
    // Initialize the form with Zod validation
    const form = useForm<LoginFormInputs>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const [isLoading, setIsLoading] = useState<boolean>(false) // Estado de carga
    const [error, setError] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState<boolean>(false) // Estado para mostrar/ocultar contraseña
    const navigate = useNavigate()

    //    const { login } = useAuth()

    const onSubmit = async (data: LoginFormInputs) => {
        setIsLoading(true)
        setError(null)

        try {
            //await login(data.email, data.password)
            navigate(Paths.HOME, { replace: true })
        } catch (err: any) {
            setError(err.message || "There was a problem logging in.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={cn(className, "flex flex-col items-center justify-center text-white")}>
            <h1 className="text-xl font-bold mb-1">Login</h1>
            <h2 className="text-sm font-light text-center">Enter your credentials to continue</h2>
            <div className="py-2" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                    {/* Email Field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Email</FormLabel>
                                <FormControl className="w-full">
                                    <Input
                                        className="bg-gray-700 w-full"
                                        type="email"
                                        placeholder="Enter your email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>This is your login email.</FormDescription>
                                <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    {/* Password Field */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl className="relative">
                                    <div className="relative text-white">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            {...field}
                                        />
                                        <span
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeClosed /> : <Eye />}
                                        </span>
                                    </div>
                                </FormControl>
                                <FormDescription>Enter your password.</FormDescription>
                                <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button type="submit" className="mt-4 w-full hover:bg-gray-700" disabled={isLoading}>
                        {isLoading && <Loader2 className="animate-spin h-5 w-5 mr-1" viewBox="0 0 24 24" />}
                        Login
                    </Button>
                </form>
            </Form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <div className="flex justify-center items-center gap-1 w-full pt-4">
                <div className="w-full h-0.5 bg-gray-500 font-light" />
                <p className="text-sm min-w-28 font-light text-center">or create an account here</p>
                <div className="w-full h-0.5 bg-gray-500 font-light" />
            </div>
            <Button
                onClick={() => setIsLoginPage(false)}
                className="mt-4 w-full bg-gray-200 text-black hover:text-gray-200 hover:bg-gray-700 duration-300"
            >
                Create Account
            </Button>
            <p className="text-sm font-light text-center pt-4">
                By continuing, you accept our Terms of Service and Privacy Policy.
            </p>
        </div>
    )
}

export default LoginBox
