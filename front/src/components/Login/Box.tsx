import React from "react"

import { cn } from "@/lib/utils"

interface BoxProps {
    children: React.ReactNode
    className?: string
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
    return (
        <div
            className={cn(
                className,
                "flex flex-col items-center justify-center p-4 shadow-md rounded-md border border-gray-200  bg-main-gradient duration-300"
            )}
        >
            {children}
        </div>
    )
}

export default Box
