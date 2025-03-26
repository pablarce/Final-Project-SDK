import { useAuth } from "@/context/AuthContext"
import { act, fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import Account from "@/components/Home/Account"

// Mock the auth context
vi.mock("@/context/AuthContext", () => ({
    useAuth: vi.fn(),
}))

describe("Account Component", () => {
    const mockLogout = vi.fn()
    const defaultProps = {
        email: "test@example.com",
        username: "testuser",
        admin: false,
        created_at: "2024-03-26",
        className: "test-class",
    }

    beforeEach(() => {
        vi.mocked(useAuth).mockReturnValue({
            logout: mockLogout,
            isAuthenticated: false,
            user: null,
            login: function (_email: string, _password: string): Promise<void> {
                throw new Error("Function not implemented.")
            },
            register: function (
                _email: string,
                _password: string,
                _username: string,
                _admin: boolean
            ): Promise<void> {
                throw new Error("Function not implemented.")
            },
        })
    })

    it("renders user information correctly", () => {
        render(<Account {...defaultProps} />)

        expect(screen.getByText("@testuser")).toBeInTheDocument()
        expect(screen.getByText("test@example.com")).toBeInTheDocument()
        expect(screen.getByText("2024-03-26")).toBeInTheDocument()
    })

    it("displays admin icon when user is admin", () => {
        render(<Account {...defaultProps} admin={true} />)
        expect(screen.getByText("admin")).toBeInTheDocument()
    })

    it("displays user icon when user is not admin", () => {
        render(<Account {...defaultProps} admin={false} />)
        expect(screen.getByText("user")).toBeInTheDocument()
    })

    it("shows avatar with correct fallback", () => {
        render(<Account {...defaultProps} />)
        expect(screen.getByText("t")).toBeInTheDocument() // First letter of username
    })

    it("calls logout function when logout button is clicked", async () => {
        render(<Account {...defaultProps} />)

        const logoutButton = screen.getByText("Logout")
        fireEvent.click(logoutButton)

        // Wait for the simulated delay
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 500))
        })

        expect(mockLogout).toHaveBeenCalled()
    })

    it("shows loading state during logout", async () => {
        render(<Account {...defaultProps} />)

        const logoutButton = screen.getByText("Logout")
        fireEvent.click(logoutButton)

        // Check for loading indicator
        expect(screen.getByRole("status")).toBeInTheDocument()

        // Wait for the simulated delay
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 500))
        })
    })

    it("applies custom className when provided", () => {
        render(<Account {...defaultProps} />)
        const container = screen.getByRole("button")
        expect(container).toHaveClass("test-class")
    })
})
