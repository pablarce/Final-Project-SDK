import { useState, useEffect } from "react"
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
import { Pencil } from "lucide-react"

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    author: z.string().min(1, "Author is required"),
    genre: z.string().min(1, "Genre is required"),
    publication_date: z.string().min(1, "Publication date is required"),
    quantity: z.coerce.number().min(1, "Quantity must be greater than 0"),
})

interface EditBookProps {
    className?: string
}

const EditBook: React.FC<EditBookProps> = ({ className }) => {
    const { updateBook, libraryData, idSelected } = useLibrary()
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    // Encontrar el libro seleccionado
    const selectedBook = libraryData?.find(book => book.id === idSelected)

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

    // Actualizar el formulario cuando cambia el libro seleccionado
    useEffect(() => {
        if (selectedBook) {
            form.reset({
                name: selectedBook.name,
                author: selectedBook.author,
                genre: selectedBook.genre,
                publication_date: selectedBook.publication_date,
                quantity: selectedBook.quantity,
            })
        }
    }, [selectedBook, form, open])

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        if (!idSelected || idSelected === "-1") {
            toast({
                title: "Error",
                description: "Debes seleccionar un libro para editar",
                variant: "destructive",
            })
            return
        }

        setIsSubmitting(true)
        try {
            await updateBook(idSelected, {
                name: data.name,
                author: data.author,
                genre: data.genre,
                publication_date: data.publication_date,
                quantity: data.quantity,
            })

            toast({
                title: "Éxito",
                description: "Libro actualizado correctamente",
                variant: "default",
            })

            setOpen(false)
        } catch (error) {
            console.error("Error al actualizar libro:", error)
            toast({
                title: "Error",
                description: "No se pudo actualizar el libro. Inténtalo de nuevo.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const isBookSelected = idSelected !== "-1" && selectedBook

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger 
                className={className} 
                disabled={!isBookSelected}
                onClick={(e) => {
                    if (!isBookSelected) {
                        e.preventDefault()
                        toast({
                            title: "Selecciona un libro",
                            description: "Debes seleccionar un libro para editarlo",
                            variant: "destructive",
                        })
                    }
                }}
            >
                <Pencil className="text-white p-1" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Libro</DialogTitle>
                    <DialogDescription>Modifica los detalles del libro seleccionado.</DialogDescription>
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
                                {isSubmitting ? "Guardando..." : "Actualizar Libro"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default EditBook
