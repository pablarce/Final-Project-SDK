import { useState } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, test } from "vitest"

function CheckboxWithLabel({ labelOn, labelOff }: { labelOn: string; labelOff: string }) {
    const [checked, setChecked] = useState(false)
    return (
        <label>
            <input type="checkbox" onChange={() => setChecked(!checked)} />
            {checked ? labelOn : labelOff}
        </label>
    )
}

test("cambia el texto al hacer clic", async () => {
    render(<CheckboxWithLabel labelOn="Encendido" labelOff="Apagado" />)

    expect(screen.getByText("Apagado")).toBeDefined()
    await userEvent.click(screen.getByRole("checkbox"))
    expect(screen.getByText("Encendido")).toBeDefined()
})
