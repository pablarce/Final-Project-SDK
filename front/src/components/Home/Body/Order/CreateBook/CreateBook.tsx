import { useState } from "react"
import { useLibrary } from "@/context/LibraryContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/Button/Button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/Dialog/Dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/Form/Form"
import { Input } from "@/components/ui/Input/Input"
import { Label } from "@/components/ui/Label/Label"

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    author: z.string().min(1, "Author is required"),
    genre: z.string().min(1, "Genre is required"),
    publication_date: z.string().min(1, "Publication date is required"),
    quantity: z.coerce.number().min(1, "Quantity must be greater than 0"),
})

interface CreateBookProps {
    className?: string
}

const CreateBook: React.FC<CreateBookProps> = ({ className }) => {
    const { createBook } = useLibrary()
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            author: "",
            genre: "",
            publication_date: "",
            quantity: 0,
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsSubmitting(true)
        try {
            await createBook({
                name: data.name,
                author: data.author,
                genre: data.genre,
                publication_date: data.publication_date,
                quantity: data.quantity,
            })

            toast({
                title: "Éxito",
                description: "Libro creado correctamente",
                variant: "default",
            })

            form.reset()
            setOpen(false)
        } catch (error) {
            console.error("Error al crear libro:", error)
            toast({
                title: "Error",
                description: "No se pudo crear el libro. Inténtalo de nuevo.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className={className}>Create Book</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a New Book</DialogTitle>
                    <DialogDescription>Fill in the details to add a new book to the library.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <Label>Book Name</Label>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter book name" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="author"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <Label>Author</Label>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter author name" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="genre"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <Label>Genre</Label>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter genre" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="publication_date"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <Label>Publication Date</Label>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="quantity"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <Label>Quantity</Label>
                                    <FormControl>
                                        <Input type="number" {...field} placeholder="Enter quantity" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-2 pt-2">
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Enviando..." : "Crear Libro"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateBook
