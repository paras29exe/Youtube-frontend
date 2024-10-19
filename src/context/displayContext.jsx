import { createContext, useState, useEffect } from "react";

export const displayContext = createContext({
    sidebarSize: "",
    showPopup: false,
    togglePopup: () => { },
    toggleSidebar: () => { },
}
)

export const ContextProvider = ({ children }) => {
    const [changeSidebar, setChangeSidebar] = useState(true)
    const [sidebarSize, setSidebarSize] = useState("")

    const [absoluteBar, setAbsoluteBar] = useState(false)

    const [showPopup, setShowPopup] = useState(false)

    const togglePopup = () => {
        setShowPopup(prev => !prev)
    }

    const toggleSidebar = () => {
        setChangeSidebar(prev => !prev)

        const screenWidth = window.innerWidth

        if (!window.location.href.includes("videos/play")) {
            if (sidebarSize === "large" && screenWidth >= 1150) {
                setSidebarSize("small");
            } else if (sidebarSize === "small" && screenWidth >= 1150) {
                setSidebarSize("large");
            } else if ((sidebarSize === "absolute" || sidebarSize === "visible") && screenWidth >= 1150) {
                setSidebarSize("large");
            } else if (sidebarSize === "large" && screenWidth >= 800 && screenWidth < 1150) {
                setSidebarSize("absolute");
            } else if (sidebarSize === "small" && screenWidth >= 800 && screenWidth < 1150) {
                setSidebarSize("absolute");
            } else if ((sidebarSize === "absolute" || sidebarSize === "visible") && screenWidth >= 800 && screenWidth < 1150) {
                setSidebarSize("small");
            } else if (sidebarSize === "absolute" && screenWidth < 800) {
                setSidebarSize("visible");
            } else {
                setSidebarSize("absolute");
            }
        } else {
            sidebarSize === "absolute" ? setSidebarSize("visible") : setSidebarSize("absolute");
        }
    }
    return (
        <displayContext.Provider value={{ toggleSidebar, changeSidebar, sidebarSize, setSidebarSize, showPopup, togglePopup }}>
            {children}
        </displayContext.Provider>
    )
}