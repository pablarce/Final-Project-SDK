import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import RegisterBox from "@/components/Login/RegisterBox"

describe("RegisterBox Component", () => {
    const mockSetIsLoginPage = vi.fn()

    it("renders the registration form correctly", () => {
        render(<RegisterBox setIsLoginPage={mockSetIsLoginPage} />)

        expect(screen.getByText("Register")).toBeInTheDocument()
        expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument()
        expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument()
        expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument()
        expect(screen.getByPlaceholderText("Confirm password")).toBeInTheDocument()
        expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument()
    })

    it("shows validation errors", async () => {
        render(<RegisterBox setIsLoginPage={mockSetIsLoginPage} />)

        const submitButton = screen.getByRole("button", { name: /register/i })
        await userEvent.click(submitButton)

        const usernameError = await screen.findByText(/username must be at least 2 characters/i)
        const emailError = await screen.findByText(/invalid email address/i)
        const passwordError = await screen.findByText(/password must be at least 6 characters/i)

        expect(usernameError).toBeInTheDocument()
        expect(emailError).toBeInTheDocument()
        expect(passwordError).toBeInTheDocument()
    })

    it("validates that passwords match", async () => {
        render(<RegisterBox setIsLoginPage={mockSetIsLoginPage} />)

        const passwordInput = screen.getByPlaceholderText("Enter password")
        const confirmPasswordInput = screen.getByPlaceholderText("Confirm password")
        const submitButton = screen.getByRole("button", { name: /register/i })

        await userEvent.type(passwordInput, "password123")
        await userEvent.type(confirmPasswordInput, "password456")
        await userEvent.click(submitButton)

        expect(await screen.findByText(/passwords must match/i)).toBeInTheDocument()
    })

    it("allows selecting user role", async () => {
        render(<RegisterBox setIsLoginPage={mockSetIsLoginPage} />)

        const userRoleButton = screen.getByText("User")
        const adminRoleButton = screen.getByText("Administrator")

        expect(userRoleButton.parentElement).toHaveClass("bg-gray-700")
        expect(adminRoleButton.parentElement).toHaveClass("bg-gray-500")

        await userEvent.click(adminRoleButton)

        expect(userRoleButton.parentElement).toHaveClass("bg-gray-500")
        expect(adminRoleButton.parentElement).toHaveClass("bg-gray-700")
    })
})
