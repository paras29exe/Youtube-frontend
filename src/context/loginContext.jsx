import { createContext, useState } from "react";

export const loginContext = createContext({
    showLoginPage: true,
    toggleLoginPage: () => { }
}
)

export const LoginProvider = ({ children }) => {
    const [showLoginPage, setShowLoginPage] = useState(true)

    const toggleLoginPage = () => {
        setShowLoginPage(prev => !prev)
    }

    return (
        <loginContext.Provider value={{ showLoginPage, toggleLoginPage }}>
            {children}
        </loginContext.Provider>
    )
}