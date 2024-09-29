import { createContext, useState, useEffect } from "react";

export const displayContext = createContext({
    showLoginPage: true,
    showSidebar: true,
    toggleLoginPage: () => { },
    toggleSidebar: () => { }
}
)

export const ContextProvider = ({ children }) => {
    const [showLoginPage, setShowLoginPage] = useState(false)
    const [changeSidebar, setChangeSidebar] = useState(true)
    const [sidebarSize, setSidebarSize] = useState("")

    const toggleLoginPage = () => {
        setShowLoginPage(prev => !prev)
    }
    const toggleSidebar = () => {
        setChangeSidebar(prev =>!prev)
    }

    return (
        <displayContext.Provider value={{ showLoginPage, toggleLoginPage, toggleSidebar, changeSidebar, sidebarSize, setSidebarSize }}>
            {children}
        </displayContext.Provider>
    )
}