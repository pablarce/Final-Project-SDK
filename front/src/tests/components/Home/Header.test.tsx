import { fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import Header from "@/components/Home/Header"

describe("Header Component", () => {
    const mockSetPage = vi.fn()

    beforeEach(() => {
        mockSetPage.mockClear()
    })

    it("renders all tabs correctly", () => {
        render(<Header page="order" setPage={mockSetPage} />)

        expect(screen.getByText("Make loan")).toBeInTheDocument()
        expect(screen.getByText("List loans")).toBeInTheDocument()
    })

    it("highlights the active tab", () => {
        render(<Header page="order" setPage={mockSetPage} />)

        const activeTab = screen.getByText("Make loan").parentElement
        const inactiveTab = screen.getByText("List loans").parentElement

        expect(activeTab).toHaveClass("bg-opacity-10")
        expect(inactiveTab).toHaveClass("bg-opacity-0")
    })

    it("calls setPage with correct value when clicking a tab", () => {
        render(<Header page="order" setPage={mockSetPage} />)

        fireEvent.click(screen.getByText("List loans"))
        expect(mockSetPage).toHaveBeenCalledWith("list")
    })

    it("applies custom className when provided", () => {
        const customClass = "custom-test-class"
        render(<Header page="order" setPage={mockSetPage} className={customClass} />)

        const headerContainer = screen.getByText("Make loan").closest('div[class*="flex flex-col"]')
        expect(headerContainer).toHaveClass(customClass)
    })

    it("maintains correct tab order", () => {
        render(<Header page="list" setPage={mockSetPage} />)

        const tabs = screen.getAllByRole("generic").filter((el) => el.textContent)
        expect(tabs[0]).toHaveTextContent("Make loan")
        expect(tabs[1]).toHaveTextContent("List loans")
    })
})
