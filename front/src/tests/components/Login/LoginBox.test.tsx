import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import LoginBox from "@/components/Login/LoginBox"

describe("LoginBox Component", () => {
    const mockSetIsLoginPage = vi.fn()

    it("renders the login form correctly", () => {
        render(<LoginBox setIsLoginPage={mockSetIsLoginPage} />)

        expect(screen.getByText("Login")).toBeInTheDocument()
        expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument()
        expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument()
        expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument()
    })

    it("shows validation errors", async () => {
        render(<LoginBox setIsLoginPage={mockSetIsLoginPage} />)

        const submitButton = screen.getByRole("button", { name: /login/i })
        await userEvent.click(submitButton)

        expect(await screen.findByText(/must be a valid email/i)).toBeInTheDocument()
        expect(await screen.findByText(/password must be at least 6 characters/i)).toBeInTheDocument()
    })

    it("allows toggling password visibility", async () => {
        render(<LoginBox setIsLoginPage={mockSetIsLoginPage} />)

        const passwordInput = screen.getByPlaceholderText("Enter your password")
        const toggleButton = screen.getByRole("button", { name: /eye/i })

        await userEvent.type(passwordInput, "test123")
        await userEvent.click(toggleButton)

        expect(passwordInput).toHaveAttribute("type", "text")
    })

    it("switches to register when clicking Create Account", async () => {
        render(<LoginBox setIsLoginPage={mockSetIsLoginPage} />)

        const createAccountButton = screen.getByRole("button", { name: /create account/i })
        await userEvent.click(createAccountButton)

        expect(mockSetIsLoginPage).toHaveBeenCalledWith(false)
    })
})
