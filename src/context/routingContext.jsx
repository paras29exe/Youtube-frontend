import { createContext, useContext, useRef } from "react";

const routingContext = createContext({
    handleRouteChange: () => { },
    handleRouteChangeComplete: () => { },
})

export const RoutingContextProvider = ({ children }) => {
    const loadingBar = useRef(null);

    // Start loading bar when route changes
    const handleRouteChange = () => {
        if (loadingBar.current) {
            loadingBar.current.continuousStart();
        }
    };

    // End loading bar after the route change and API data is fetched
    const handleRouteChangeComplete = () => {
        if (loadingBar.current) {
            loadingBar.current.complete();
        }
    };
    return (
        <routingContext.Provider value={{ handleRouteChange, handleRouteChangeComplete, loadingBar }}>
            {children}
        </routingContext.Provider>
    )
}

export const useRoutingContext = () => useContext(routingContext);
