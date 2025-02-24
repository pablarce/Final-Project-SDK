import React, { useState } from "react"
import { useLibrary } from "@/context/LibraryContext"
import { useLoans } from "@/context/LoansContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
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
    quantity: z.number().min(1, { message: "La cantidad debe ser al menos 1." }),
    startDate: z.string().min(1, { message: "La fecha de inicio es obligatoria." }),
    endDate: z.string().min(1, { message: "La fecha de devolución es obligatoria." }),
})

type OrderFormInputs = z.infer<typeof formSchema>

interface OrderFormProps {
    className?: string
    handleRefetch: any
}

const OrderForm: React.FC<OrderFormProps> = ({ className, handleRefetch }) => {
    const { toast } = useToast()

    const { idSelected, libraryData } = useLibrary()
    const { addLoan } = useLoans() // Función para crear préstamos
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Encuentra el nombre del libro basado en idSelected
    const selectedBook = libraryData?.find((book) => book.id === idSelected)
    const bookName = selectedBook?.name || "No seleccionado"

    const form = useForm<OrderFormInputs>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            quantity: 1,
            startDate: "",
            endDate: "",
        },
    })

    const handleSubmit = async (data: OrderFormInputs) => {
        if (!idSelected) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Debes seleccionar un libro para crear un préstamo.",
            })
            return
        }

        setIsLoading(true) // Activar loader
        try {
            console.log(Number(idSelected), data.quantity, data.startDate, data.endDate)
            await addLoan(Number(idSelected), data.quantity, data.startDate, data.endDate)
            await new Promise((resolve) => setTimeout(resolve, 1000)) // Espera 1 segundo
            toast({
                title: "Préstamo Creado",
                description: `Se ha creado el préstamo de "${bookName}" correctamente.`,
            })
            await form.reset()
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error al crear el préstamo",
                description: error.message || "No se pudo crear el préstamo.",
            })
        } finally {
            handleRefetch()
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className={cn("flex flex-col items-center justify-center w-full space-y-4 text-white", className)}
            >
                {/* Nombre del Libro */}
                <FormItem className="w-full">
                    <FormLabel>Nombre del Libro</FormLabel>
                    <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700">
                        {bookName}
                    </div>
                    <FormDescription>El nombre del libro seleccionado.</FormDescription>
                </FormItem>

                {/* Campo: Cantidad */}
                <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Cantidad</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min="1"
                                    placeholder="Cantidad"
                                    {...field}
                                    value={field.value ?? ""}
                                    onChange={(e) => field.onChange(Number(e.target.value))} // Convierte a número
                                    disabled={isLoading}
                                />
                            </FormControl>
                            <FormDescription>¿Cuántos libros necesitas?</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Campo: Fecha de Inicio */}
                <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Fecha de Inicio</FormLabel>
                            <FormControl>
                                <Input type="date" placeholder="Fecha de inicio" {...field} disabled={isLoading} />
                            </FormControl>
                            <FormDescription>Selecciona la fecha de inicio del préstamo.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Campo: Fecha de Devolución */}
                <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Fecha de Devolución</FormLabel>
                            <FormControl>
                                <Input
                                    type="date"
                                    placeholder="Fecha de devolución"
                                    {...field}
                                    disabled={isLoading}
                                />
                            </FormControl>
                            <FormDescription>Selecciona la fecha de devolución.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Botón de Enviar */}
                <Button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2"
                    disabled={isLoading}
                >
                    {isLoading && <Loader2 className="animate-spin" />}
                    <p>Crear Préstamo</p>
                </Button>
            </form>
        </Form>
    )
}

export default OrderForm
