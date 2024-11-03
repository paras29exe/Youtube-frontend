import { Navbar, SideBar} from "./components"
import { Outlet } from 'react-router-dom'
import './App.css'
import { useContext } from "react"
import { displayContext } from "./context/displayContext"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  const {notFound} = useContext(displayContext)

  if(notFound) return <NotFoundPage />

  return (
    <>
      <div className='h-screen overflow-hidden'>
        <Navbar />
        <div className='h-screen overflow-hidden flex pb-20'>
          <SideBar />
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App
