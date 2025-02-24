import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { CalendarDays, Loader2, User, UserRoundCog } from "lucide-react"

import { cn } from "@/lib/utils"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/Hover-card/Hover-card"

interface AccountProps {
    email: string
    username: string
    admin: boolean
    created_at: string
    className?: string
}

const Account = ({ email, username, admin, created_at, className }: AccountProps) => {
    const { logout } = useAuth()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleLogout = async () => {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 400)) // Simula un retraso de 400 ms
        logout()
        setIsLoading(false)
    }

    return (
        <HoverCard>
            <HoverCardTrigger className={cn(className, "w-[64px] h-[64px] cursor-pointer z-50")}>
                <Avatar
                    className={cn(
                        className,
                        "rounded-full hover:opacity-75 hover:scale-105 transition-all border-gray-200 z-50"
                    )}
                >
                    <AvatarFallback className="">{username.charAt(0)}</AvatarFallback>
                    <AvatarImage
                        className="border border-gray-400  rounded-full"
                        src={`https://github.com/${username}.png`}
                    />
                </Avatar>
            </HoverCardTrigger>
            <HoverCardContent>
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex justify-between items-center space-x-4">
                        <Avatar className="flex flex-col items-center justify-center">
                            <div className="w-10 h-10 flex flex-col items-center justify-center bg-gray-200 rounded-full">
                                {admin ? <UserRoundCog className="w-6 h-6" /> : <User className="w-6 h-6" />}
                            </div>
                            {admin ? "admin" : "user"}
                        </Avatar>
                        <div className="space-y-1 duration-300">
                            <h4 className="text-sm font-semibold">@{username}</h4>
                            <p className="text-sm max-w-[170px] truncate">{email}</p>
                            <div className="flex items-center">
                                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                                <span className="text-xs text-muted-foreground">{created_at}</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="mt-2 px-4 py-2 bg-black w-full text-white rounded hover:bg-gray-700 transition flex items-center justify-center"
                        disabled={isLoading}
                    >
                        {isLoading && <Loader2 className="animate-spin h-5 w-5 mr-2" />} <p>Logout</p>
                    </button>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}

export default Account
