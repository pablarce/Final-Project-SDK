import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import Box from "@/components/Login/Box"

describe("Box Component", () => {
    it("renders correctly with children", () => {
        render(
            <Box>
                <div>Test Content</div>
            </Box>
        )
        expect(screen.getByText("Test Content")).toBeInTheDocument()
    })

    it("applies custom classes", () => {
        render(
            <Box className="custom-class">
                <div>Test Content</div>
            </Box>
        )
        const boxElement = screen.getByText("Test Content").parentElement
        expect(boxElement).toHaveClass("custom-class")
    })
})
