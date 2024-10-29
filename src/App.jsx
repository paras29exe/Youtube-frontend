import './App.css'
import { Navbar, SideBar} from "./components"

import { Outlet } from 'react-router-dom'

function App() {

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
