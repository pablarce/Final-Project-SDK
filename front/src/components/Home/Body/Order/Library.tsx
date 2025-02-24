import * as React from "react"
import { useLibrary } from "@/context/LibraryContext"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, Loader2 } from "lucide-react"

import { LibraryBook } from "@/lib/types"
import { Button } from "@/components/ui/Button/Button"
import { Input } from "@/components/ui/Input/Input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table/Table"

interface LibraryProps {
    className?: string
}

export const Library: React.FC<LibraryProps> = ({ className }) => {
    const { libraryData, error, loading, idSelected, setIdSelected } = useLibrary()

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

    const columns: ColumnDef<LibraryBook>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    className="text-white"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nombre del Libro
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
        },
        {
            accessorKey: "author",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    className="text-white"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Autor
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="text-white">{row.getValue("author")}</div>,
        },
        {
            accessorKey: "genre",
            header: "Género",
            cell: ({ row }) => <div className="capitalize text-white">{row.getValue("genre")}</div>,
        },
        {
            accessorKey: "publication_date",
            header: "Fecha de Publicación",
            cell: ({ row }) => {
                const date = new Date(row.getValue("publication_date"))
                return <div className="text-white">{date.toLocaleDateString()}</div>
            },
        },
        {
            accessorKey: "quantity",
            header: "Cantidad",
            cell: ({ row }) => <div className="text-right font-medium text-white">{row.getValue("quantity")}</div>,
        },
    ]

    const table = useReactTable({
        data: libraryData || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        state: {
            sorting,
            columnFilters,
        },
    })

    return (
        <div className={`w-full text-white p-6 ${className}`}>
            {/* Barra de búsqueda */}
            <div className="flex items-center py-4">
                <Input
                    placeholder="Buscar libros por nombre..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
            </div>

            {/* Tabla de datos */}
            <div className="rounded-md border min-h-[420px]">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24">
                                    <div className="flex items-center justify-center">
                                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                        <span className="ml-2">Cargando datos...</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : error ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24">
                                    <div className="flex flex-col items-center justify-center text-destructive">
                                        <p>Error al cargar los datos</p>
                                        <p className="text-sm text-muted-foreground">{error}</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    onClick={() => setIdSelected(row.original.id)}
                                    className={`cursor-pointer ${
                                        idSelected === row.original.id ? "bg-green-500 text-white" : ""
                                    }`}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No hay resultados.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Paginación */}
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="secondary"
                    size="sm"
                    className=" text-black"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Anterior
                </Button>
                <Button
                    variant="secondary"
                    size="sm"
                    className=" text-black"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Siguiente
                </Button>
            </div>
        </div>
    )
}

export default Library
