import { useLoans } from "@/context/LoansContext"
import { fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import List from "@/components/Home/Body/List"

// Mock the loans context
vi.mock("@/context/LoansContext", () => ({
    useLoans: vi.fn(),
}))

describe("List Component", () => {
    const mockLoans = [
        {
            id: 1,
            book_name: "Test Book",
            username: "testuser",
            email: "test@example.com",
            quantity: 2,
            start_date: "2024-03-26",
            end_date: "2024-04-26",
            status: "active",
        },
    ]

    beforeEach(() => {
        vi.mocked(useLoans).mockReturnValue({
            loans: mockLoans.map((loan) => ({
                ...loan,
                book_id: 1,
                user_id: "1",
                author: "Test Author",
                genre: "Test Genre",
            })),
            error: null,
            loading: false,
            refetchLoans: vi.fn(),
            addLoan: vi.fn(),
        })
    })

    it("renders table with correct columns", () => {
        render(<List />)

        expect(screen.getByText("Book Name")).toBeInTheDocument()
        expect(screen.getByText("User")).toBeInTheDocument()
        expect(screen.getByText("Email")).toBeInTheDocument()
        expect(screen.getByText("Quantity")).toBeInTheDocument()
        expect(screen.getByText("Start date")).toBeInTheDocument()
        expect(screen.getByText("Return date")).toBeInTheDocument()
        expect(screen.getByText("Status")).toBeInTheDocument()
    })

    it("displays loan data correctly", () => {
        render(<List />)

        expect(screen.getByText("Test Book")).toBeInTheDocument()
        expect(screen.getByText("testuser")).toBeInTheDocument()
        expect(screen.getByText("test@example.com")).toBeInTheDocument()
        expect(screen.getByText("2")).toBeInTheDocument()
        expect(screen.getByText("active")).toBeInTheDocument()
    })

    it("shows loading state", () => {
        vi.mocked(useLoans).mockReturnValue({
            loans: [],
            error: null,
            loading: true,
            refetchLoans: vi.fn(),
            addLoan: vi.fn(),
        })

        render(<List />)
        expect(screen.getByText("Loading data...")).toBeInTheDocument()
    })

    it("shows error state", () => {
        vi.mocked(useLoans).mockReturnValue({
            loans: [],
            error: "Error loading data",
            loading: false,
            refetchLoans: vi.fn(),
            addLoan: vi.fn(),
        })

        render(<List />)
        expect(screen.getByText("Error loading data.")).toBeInTheDocument()
    })

    it("shows empty state when no loans", () => {
        vi.mocked(useLoans).mockReturnValue({
            loans: [],
            error: null,
            loading: false,
            refetchLoans: vi.fn(),
            addLoan: vi.fn(),
        })

        render(<List />)
        expect(screen.getByText("No results found.")).toBeInTheDocument()
    })

    it("filters data based on search input", () => {
        render(<List />)

        const searchInput = screen.getByPlaceholderText("Search by book name...")
        fireEvent.change(searchInput, { target: { value: "Test" } })

        expect(screen.getByText("Test Book")).toBeInTheDocument()
    })

    it("applies custom className when provided", () => {
        render(<List className="custom-class" />)
        const container = screen.getByText("Book Name").closest("div")
        expect(container).toHaveClass("custom-class")
    })
})
