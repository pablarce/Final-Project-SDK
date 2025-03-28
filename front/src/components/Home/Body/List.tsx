import * as React from "react"
import { useLoans } from "@/context/LoansContext"
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

import { Loan } from "@/lib/types"
import { Button } from "@/components/ui/Button/Button"
import { Input } from "@/components/ui/Input/Input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table/Table"

interface ListProps {
    className?: string
}

export const List: React.FC<ListProps> = ({ className }) => {
    const { loans, error, loading } = useLoans()

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

    const columns: ColumnDef<Loan>[] = [
        {
            accessorKey: "book_name",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    className="text-white"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Book Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="font-medium">{row.getValue("book_name")}</div>,
        },
        {
            accessorKey: "username",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    className="text-white"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    User
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="font-medium ">{row.getValue("username")}</div>,
        },
        {
            accessorKey: "email",
            header: () => <p className="text-white">Email</p>,
            cell: ({ row }) => <div>{row.getValue("email")}</div>,
        },

        {
            accessorKey: "quantity",
            header: () => <p className="text-white">Quantity</p>,
            cell: ({ row }) => <div className="font-medium  ">{row.getValue("quantity")}</div>,
        },
        {
            accessorKey: "start_date",
            header: () => <p className="text-white">Start date</p>,
            cell: ({ row }) => {
                const date = new Date(row.getValue("start_date"))
                return <div>{date.toLocaleDateString()}</div>
            },
        },
        {
            accessorKey: "end_date",
            header: () => <p className="text-white">Return date</p>,
            cell: ({ row }) => {
                const date = new Date(row.getValue("end_date"))
                return <div>{date.toLocaleDateString()}</div>
            },
        },
        {
            accessorKey: "status",
            header: () => <p className="text-white">Status</p>,
            cell: ({ row }) => {
                const status = row.getValue("status")
                return (
                    <div
                        className={`font-semibold ${
                            status === "active"
                                ? "text-green-600"
                                : status === "late"
                                  ? "text-red-600"
                                  : "text-white"
                        }`}
                    >
                        <p>{status as string}</p>
                    </div>
                )
            },
        },
    ]

    const table = useReactTable({
        data: loans || [],
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
        <div className={`w-full text-white p-6 bg-main-gradient h-full ${className}`}>
            {/* Search bar */}
            <div className="flex items-center py-4">
                <Input
                    placeholder="Search by book name..."
                    value={(table.getColumn("book_name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("book_name")?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
            </div>

            {/* Data table */}
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
                                        <span className="ml-2">Loading data...</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : error ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-red-600 text-center">
                                    Error loading data.
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
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
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="secondary"
                    size="sm"
                    className="text-black"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="secondary"
                    size="sm"
                    className="text-black"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}

export default List
