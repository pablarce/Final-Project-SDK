import { useState } from "react"

import Box from "@/components/Login/Box"
import LoginBox from "@/components/Login/LoginBox"
import RegisterBox from "@/components/Login/RegisterBox"

interface LoginProps {
    className?: string
}

const Login: React.FC<LoginProps> = ({ className }) => {
    const [isLoginPage, setIsLoginPage] = useState(true)

    return (
        <div className={className}>
            <div className="flex flex-col items-center justify-center h-screen bg-main-gradient-inverse z-50 ">
                <Box className="text-white flex relative my-2 overflow-clip min-h-[600px]">
                    <>
                        <LoginBox
                            setIsLoginPage={setIsLoginPage}
                            className={`${isLoginPage ? "" : "translate-x-[600px]"} absolute w-3/4 duration-300 z-10 `}
                        />
                        <RegisterBox
                            setIsLoginPage={setIsLoginPage}
                            className={`${isLoginPage ? "translate-x-[600px]" : ""} w-3/4 duration-300 z-10`}
                        />
                    </>
                </Box>
            </div>
        </div>
    )
}

export default Login
