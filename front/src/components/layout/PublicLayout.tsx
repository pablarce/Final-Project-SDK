import React from "react"
import Paths from "@/router/paths"
import { Navigate, Outlet } from "react-router-dom"

import { useAuth } from "../../context/AuthContext"

const PublicLayout: React.FC = () => {
    const { isAuthenticated } = useAuth()

    if (isAuthenticated) {
        return <Navigate to={Paths.HOME} replace />
    }
    return (
        <main>
            <Outlet />
        </main>
    )
}

export default PublicLayout
