import React, { useState } from "react"
import { useAuth } from "@/context/AuthContext"

import Account from "@/components/Home/Account"
import Body from "@/components/Home/Body"
import Header from "@/components/Home/Header"

interface HomeProps {
    className?: string
}

const Home: React.FC<HomeProps> = ({ className }) => {
    const { user } = useAuth()

    const [page, setPage] = useState<string>("order")

    return (
        <div className={`h-screen flex flex-col ${className}`}>
            <Account
                className="absolute top-3 right-3"
                email={user?.email || ""}
                username={user?.username || ""}
                admin={user?.admin || false}
                created_at={user?.created_at || ""}
            />
            <Header className="h-[140px]" page={page} setPage={setPage} />
            <Body className="h-full" page={page} />
        </div>
    )
}

export default Home
