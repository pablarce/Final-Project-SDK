import "@testing-library/jest-dom"

import { expect, vi } from "vitest"

// Make vi available globally
;(global as any).vi = vi

// Extend expect matchers
expect.extend({
    toBeInTheDocument(received) {
        const pass = received !== null
        return {
            pass,
            message: () => `expected ${received} to be in the document`,
        }
    },
})

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}))

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
})

// Mock de react-router-dom
vi.mock("react-router-dom", () => ({
    useNavigate: () => vi.fn(),
}))

// Mock del contexto de autenticación
vi.mock("@/context/AuthContext", () => ({
    useAuth: () => ({
        login: vi.fn(),
        register: vi.fn(),
    }),
}))
