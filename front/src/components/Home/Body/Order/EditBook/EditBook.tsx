import { useEffect, useState } from "react"
import { useLibrary } from "@/context/LibraryContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil } from "lucide-react"
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

interface EditBookProps {
    className?: string
}

const EditBook: React.FC<EditBookProps> = ({ className }) => {
    const { updateBook, libraryData, idSelected } = useLibrary()
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    // Encontrar el libro seleccionado
    const selectedBook = libraryData?.find((book) => book.id === idSelected)

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
                description: "You must select a book to edit",
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
                title: "Success",
                description: "Book updated successfully",
                variant: "default",
            })

            setOpen(false)
        } catch (error) {
            console.error("Error updating book:", error)
            toast({
                title: "Error",
                description: "Could not update the book. Please try again.",
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
                            title: "Select a book",
                            description: "You must select a book to edit it",
                            variant: "destructive",
                        })
                    }
                }}
            >
                <Pencil className="text-white p-1" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Book</DialogTitle>
                    <DialogDescription>Modify the details of the selected book.</DialogDescription>
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
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Saving..." : "Update Book"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default EditBook
