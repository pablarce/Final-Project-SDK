import React, { useEffect, useRef, useState } from "react"
import { useLibrary } from "@/context/LibraryContext" // Contexto de la Library

import { cn } from "@/lib/utils"

import Library from "./Library"
import OrderForm from "./OrderForm"

interface OrderProps {
    className?: string
}

const Order: React.FC<OrderProps> = ({ className }) => {
    const { refetch } = useLibrary()
    const [isCooldown, setIsCooldown] = useState(false)
    const cooldownRef = useRef<NodeJS.Timeout | null>(null)

    // Función para manejar el refetch con cooldown
    const handleRefetch = () => {
        if (!isCooldown) {
            refetch() // Ejecuta la petición

            setIsCooldown(true)
            cooldownRef.current = setTimeout(() => {
                setIsCooldown(false)
            }, 2000)
        } else {
            console.warn("Refetch is in cooldown, try again later.")
        }
    }

    useEffect(() => {
        handleRefetch()
        return () => {
            if (cooldownRef.current) clearTimeout(cooldownRef.current) // Limpia el timeout
        }
    }, [])

    return (
        <div className={cn("w-full h-full grid grid-cols-3 bg-main-gradient", className)}>
            {/* Sección de la Library con Loader */}
            <Library className="col-span-2" />

            {/* Sección del Formulario */}
            <OrderForm className="p-6" handleRefetch={handleRefetch} />
        </div>
    )
}

export default Order
