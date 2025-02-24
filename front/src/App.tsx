import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import ProtectedLayout from "./components/layout/ProtectedLayout"
import PublicLayout from "./components/layout/PublicLayout"
import { Toaster } from "./components/ui/Toast/Toaster"
import { AuthProvider } from "./context/AuthContext"
import { LibraryProvider } from "./context/LibraryContext"
import { LoansProvider } from "./context/LoansContext"
import Paths from "./router/paths"
import routes from "./router/routes"

const App = () => {
    return (
        <AuthProvider>
            <LibraryProvider>
                <LoansProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="*" element={<Navigate to={Paths.HOME} replace />} />

                            {/* Rutas públicas */}
                            <Route element={<PublicLayout />}>
                                {routes.public.map((route, i) => (
                                    <Route key={`public-${i}`} {...route} />
                                ))}
                            </Route>

                            {/* Rutas protegidas */}
                            <Route element={<ProtectedLayout />}>
                                {routes.private.map((route, i) => (
                                    <Route key={`private-${i}`} {...route} />
                                ))}
                            </Route>
                        </Routes>
                    </BrowserRouter>
                    <Toaster />
                </LoansProvider>
            </LibraryProvider>
        </AuthProvider>
    )
}

export default App
