import { cn } from "@/lib/utils"

import List from "./Body/List"
import Order from "./Body/Order/Order"

interface BodyInterface {
    page: string
    className?: string
}

const Body = ({ page, className }: BodyInterface) => {
    const renderContent = () => {
        switch (page) {
            case "order":
                return <Order />
            case "list":
                return <List />
            default:
                return <div>Página no encontrada</div>
        }
    }

    return <div className={cn("w-full h-full bg-white", className)}>{renderContent()}</div>
}

export default Body
