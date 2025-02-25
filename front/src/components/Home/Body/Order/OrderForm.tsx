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
    quantity: z.number().min(1, { message: "Quantity must be at least 1." }),
    startDate: z.string().min(1, { message: "Start date is required." }),
    endDate: z.string().min(1, { message: "Return date is required." }),
})

type OrderFormInputs = z.infer<typeof formSchema>

interface OrderFormProps {
    className?: string
    handleRefetch: any
}

const OrderForm: React.FC<OrderFormProps> = ({ className, handleRefetch }) => {
    const { toast } = useToast()

    const { idSelected, libraryData } = useLibrary()
    const { addLoan } = useLoans() // Function to create loans
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Find book name based on idSelected
    const selectedBook = libraryData?.find((book) => book.id === idSelected)
    const bookName = selectedBook?.name || "Not selected"

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
                description: "You must select a book to create a loan.",
            })
            return
        }

        setIsLoading(true) // Activate loader
        try {
            await addLoan(Number(idSelected), data.quantity, data.startDate, data.endDate)
            await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait 1 second
            toast({
                title: "Loan Created",
                description: `The loan for "${bookName}" has been created successfully.`,
            })
            await form.reset()
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error creating loan",
                description: error.message || "Could not create the loan.",
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
                {/* Book Name */}
                <FormItem className="w-full">
                    <FormLabel>Book Name</FormLabel>
                    <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700">
                        {bookName}
                    </div>
                    <FormDescription>The selected book name.</FormDescription>
                </FormItem>

                {/* Field: Quantity */}
                <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min="1"
                                    placeholder="Quantity"
                                    {...field}
                                    value={field.value ?? ""}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    disabled={isLoading}
                                />
                            </FormControl>
                            <FormDescription>How many books do you need?</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Field: Start Date */}
                <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                                <Input type="date" placeholder="Start date" {...field} disabled={isLoading} />
                            </FormControl>
                            <FormDescription>Select the loan start date.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Field: Return Date */}
                <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Return Date</FormLabel>
                            <FormControl>
                                <Input type="date" placeholder="Return date" {...field} disabled={isLoading} />
                            </FormControl>
                            <FormDescription>Select the return date.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2"
                    disabled={isLoading}
                >
                    {isLoading && <Loader2 className="animate-spin" />}
                    <p>Create Loan</p>
                </Button>
            </form>
        </Form>
    )
}

export default OrderForm
