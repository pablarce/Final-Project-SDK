import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
    quantity: z.string().min(1, "Quantity is required"),
})

interface CreateBookProps {
    className?: string
}

const CreateBook: React.FC<CreateBookProps> = ({ className }) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            author: "",
            genre: "",
            publication_date: "",
            quantity: "",
        },
    })

    const onSubmit = (data: any) => {
        console.log("Book Data:", data)
    }

    return (
        <Dialog>
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

                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateBook
