import { FooterNav, Navbar, SideBar } from "./components";
import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import { useContext, useRef, useEffect, useState } from "react";
import { displayContext } from "./context/displayContext";
import TopLoadingBar from 'react-top-loading-bar'; // Import for the top loading bar
import NotFoundPage from "./pages/NotFoundPage";
import Skeleton from "./components/Skeleton";

function App() {
  const { notFound } = useContext(displayContext);
  const loadingBar = useRef(null);
  // const [showLoadingBar, setShowLoadingBar] = useState(true)
  const location = useLocation();

  useEffect(() => {
    // setShowLoadingBar(true);
    loadingBar.current?.continuousStart();

    const timer = setTimeout(() => {
      loadingBar.current?.complete();
      // setShowLoadingBar(false);
    }, 500);

    return () => clearTimeout(timer); // Clean up timer to avoid memory leaks
  }, [location.pathname]);


  // If the page not found, show NotFoundPage
  if (notFound) return <NotFoundPage />;

  return (
    <>
      <TopLoadingBar color="#FF0000" ref={loadingBar} height={3} />
      <div className="h-screen overflow-hidden">
        <Navbar />
        <div className="h-screen w-full overflow-hidden flex max-sm:pb-16">
          {/* this side bbar have classname hidden for smaller width sizes like phone */}
          <SideBar />

          <Outlet />

        </div>
        {/* this footer will be visible when the sidebar disappear or we can say for phone widths */}
        <FooterNav />
      </div>
    </>
  );
}

export default App;
