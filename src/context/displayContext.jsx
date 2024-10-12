import { createContext, useState, useEffect } from "react";

export const displayContext = createContext({
    showLoginPage: true,
    showSidebar: true,
    toggleLoginPage: () => { },
    toggleSidebar: () => { }
}
)

export const ContextProvider = ({ children }) => {
    const [changeSidebar, setChangeSidebar] = useState(true)
    const [sidebarSize, setSidebarSize] = useState("")

    const toggleSidebar = () => {
        setChangeSidebar(prev => !prev)

        const screenWidth = window.innerWidth

        if (sidebarSize === "large" && screenWidth >= 1150) {
            setSidebarSize("small");
        } else if (sidebarSize === "small" && screenWidth >= 1150) {
            setSidebarSize("large");
        } else if (sidebarSize === "hidden" && screenWidth >= 1150) {
            setSidebarSize("large");
        } else if (sidebarSize === "large" && screenWidth >= 800 && screenWidth < 1150) {
            setSidebarSize("hidden");
        } else if (sidebarSize === "small" && screenWidth >= 800 && screenWidth < 1150) {
            setSidebarSize("hidden");
        } else if (sidebarSize === "hidden" && screenWidth >= 800 && screenWidth < 1150) {
            setSidebarSize("small");
        } else {
            setSidebarSize("hidden");
        }

    }

    return (
        <displayContext.Provider value={{ toggleSidebar, changeSidebar, sidebarSize, setSidebarSize }}>
            {children}
        </displayContext.Provider>
    )
}