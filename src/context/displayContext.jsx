import { createContext, useState } from "react";

export const displayContext = createContext({
    showLoginPage: true,
    showSidebar: true,
    toggleLoginPage: () => { },
    toggleSidebar: () => { }
}
)

export const ContextProvider = ({ children }) => {
    const [showLoginPage, setShowLoginPage] = useState(true)
    const [showSidebar, setShowSidebar] = useState(true)

    const toggleLoginPage = () => {
        setShowLoginPage(prev => !prev)
    }
    const toggleSidebar = () => {
        setShowSidebar(prev =>!prev)
    }

    return (
        <displayContext.Provider value={{ showLoginPage, toggleLoginPage, showSidebar, setShowSidebar, toggleSidebar }}>
            {children}
        </displayContext.Provider>
    )
}