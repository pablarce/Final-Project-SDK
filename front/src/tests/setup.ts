import "@testing-library/jest-dom"

import { vi } from "vitest"

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
