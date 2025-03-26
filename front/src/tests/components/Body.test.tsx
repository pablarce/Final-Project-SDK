import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import Body from "@/components/Home/Body"

// Mock the child components
vi.mock("@/components/Home/Body/List", () => ({
    default: () => <div data-testid="mock-list">List Component</div>,
}))

vi.mock("@/components/Home/Body/Order/Order", () => ({
    default: () => <div data-testid="mock-order">Order Component</div>,
}))

describe("Body Component", () => {
    it('renders Order component when page is "order"', () => {
        render(<Body page="order" />)
        expect(screen.getByTestId("mock-order")).toBeInTheDocument()
    })

    it('renders List component when page is "list"', () => {
        render(<Body page="list" />)
        expect(screen.getByTestId("mock-list")).toBeInTheDocument()
    })

    it('renders "Page not found" for invalid page', () => {
        render(<Body page="invalid" />)
        expect(screen.getByText("Page not found")).toBeInTheDocument()
    })

    it("applies custom className when provided", () => {
        const customClass = "custom-class"
        render(<Body page="order" className={customClass} />)
        const container = screen.getByTestId("mock-order").parentElement
        expect(container).toHaveClass(customClass)
    })
})
