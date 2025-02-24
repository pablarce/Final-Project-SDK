import React, { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import Paths from "@/router/paths"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeftFromLine, Loader2, User, UserRoundCog } from "lucide-react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button/Button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form/Form"
import { Input } from "@/components/ui/Input/Input"

// Define the form validation schema with Zod
const registerFormSchema = z
    .object({
        username: z
            .string()
            .min(2, { message: "Username must be at least 2 characters." })
            .max(50, { message: "Username cannot exceed 50 characters." }),
        email: z.string().email({ message: "Invalid email address." }),
        password: z
            .string()
            .min(6, { message: "Password must be at least 6 characters." })
            .max(100, { message: "Password cannot exceed 100 characters." }),
        confirmPassword: z
            .string()
            .min(6, { message: "Password confirmation must be at least 6 characters." })
            .max(100, { message: "Password confirmation cannot exceed 100 characters." }),
        role: z.enum(["user", "admin"], {
            required_error: "Por favor selecciona un rol.",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match.",
        path: ["confirmPassword"],
    })

interface RegisterFormInputs {
    username: string
    email: string
    password: string
    confirmPassword: string
    role: "user" | "admin"
}

interface RegisterBoxProps {
    className?: string
    setIsLoginPage: (isLoginPage: boolean) => void
}

const RegisterBox: React.FC<RegisterBoxProps> = ({ className, setIsLoginPage }) => {
    // Initialize the form with Zod validation
    const form = useForm<RegisterFormInputs>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "user",
        },
    })

    const { register } = useAuth()

    const [error, setError] = useState<string | null>(null)
    const [selectedRole, setSelectedRole] = useState<"user" | "admin">("user")
    const [isLoading, setIsLoading] = useState<boolean>(false) // Estado de carga

    const navigate = useNavigate() // Hook para navegación

    const onSubmit = async (data: RegisterFormInputs) => {
        setIsLoading(true)
        setError(null)

        if (data.password !== data.confirmPassword) {
            setError("Las contraseñas no coinciden.")
            setIsLoading(false)
            return
        }

        try {
            await register(data.email, data.password, data.username, selectedRole === "admin") // Usamos `register` del contexto
            navigate(Paths.HOME, { replace: true }) // Redirige al home después del registro
        } catch (err: any) {
            setError(err.message || "Hubo un problema durante el registro.")
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className={cn(className, "flex flex-col items-center justify-center text-white")}>
            <div className="flex items-center justify-between w-full">
                <div
                    className="rounded-full hover:bg-gray-700 p-3 w-10 h-10 flex items-center justify-center duration-300 cursor-pointer"
                    onClick={() => setIsLoginPage(true)}
                >
                    <ArrowLeftFromLine className="w-6 h-6" />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-xl font-bold mb-1">Registrarse</h1>
                    <h2 className="text-sm font-light text-center">Crea tu cuenta para continuar</h2>
                </div>
                <div className="w-10" />
            </div>

            <div className="py-2" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                    {/* Username Field */}
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Username</FormLabel>
                                <FormControl className="w-full">
                                    <Input
                                        className="bg-gray-700 w-full"
                                        placeholder="Enter username"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage>{form.formState.errors.username?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

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
                                        placeholder="Enter email"
                                        type="email"
                                        {...field}
                                    />
                                </FormControl>
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
                                <FormControl>
                                    <Input type="password" placeholder="Enter password" {...field} />
                                </FormControl>
                                <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    {/* Confirm Password Field */}
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Confirm password" {...field} />
                                </FormControl>
                                <FormMessage>{form.formState.errors.confirmPassword?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="role"
                        render={() => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex space-x-4 w-full pt-5">
                                        <div
                                            className={`select-none flex flex-col items-center justify-center cursor-pointer duration-300 p-4 border w-1/2 hover:scale-100
                                                 ${selectedRole === "user" ? "bg-gray-700 border-white shadow-xl sclae-100" : "bg-gray-500 border-gray-800 scale-95"}`}
                                            onClick={() => setSelectedRole("user")}
                                        >
                                            <User />
                                            <p>Usuario</p>
                                        </div>
                                        <div
                                            className={`select-none flex flex-col items-center justify-center cursor-pointer duration-300 p-4 border w-1/2  hover:scale-100
                                                 ${selectedRole === "admin" ? "bg-gray-700 border-white shadow-xl scale-100" : "bg-gray-500 border-gray-800 scale-95"}`}
                                            onClick={() => setSelectedRole("admin")}
                                        >
                                            <UserRoundCog></UserRoundCog>
                                            <p>Administrador</p>
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage>{form.formState.errors.role?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button type="submit" className="mt-4 w-full hover:bg-gray-700" disabled={isLoading}>
                        {isLoading && <Loader2 className="animate-spin h-5 w-5 mr-1" viewBox="0 0 24 24" />}
                        Registrarse
                    </Button>
                </form>
            </Form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <p className="text-sm font-light text-center pt-4 ">
                Al hacer clic en registrarse, aceptas nuestros Términos de Servicio y Política de Privacidad.
            </p>
        </div>
    )
}

export default RegisterBox
