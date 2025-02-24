import { cn } from "@/lib/utils"

interface HeaderInterface {
    page: string
    setPage: React.Dispatch<React.SetStateAction<string>>
    className?: string
}

const Header = ({ page, setPage, className }: HeaderInterface) => {
    const tabs = [
        { id: "order", label: "Realizar prestamo" },
        { id: "list", label: "Listar prestamos" },
    ]

    return (
        <div className={cn(`flex flex-col justify-end bg-main-gradient h-full text-white text-xl`, className)}>
            <div className="relative h-full">
                <div className="flex h-full">
                    {tabs.map((tab) => (
                        <div
                            key={tab.id}
                            onClick={() => setPage(tab.id)}
                            className={cn(
                                "flex flex-1 px-4 py-2 transition-colors duration-600 relative bg-white cursor-pointer items-end justify-center text-2xl",
                                page === tab.id ? " bg-opacity-10" : "text-gray-400 bg-opacity-0"
                            )}
                            style={{ height: "100%" }}
                        >
                            <p className="pb-3">{tab.label}</p>
                            {page === tab.id && (
                                <div className="absolute inset-0 bg-white bg-opacity-10 rounded-md -z-10" />
                            )}
                        </div>
                    ))}
                </div>
                <div
                    className="absolute bottom-0 h-1 bg-gray-200 transition-all duration-300"
                    style={{
                        width: `${100 / tabs.length}%`,
                        transform: `translateX(${tabs.findIndex((t) => t.id === page) * 100}%)`,
                    }}
                />
            </div>
        </div>
    )
}

export default Header
