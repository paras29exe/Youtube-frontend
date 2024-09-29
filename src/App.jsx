import './App.css'
import { Navbar, SideBar, Home, VideoUpload, Signup, Videos } from "./components"
import Skeleton from './components/Skeleton'
import { useDispatch } from 'react-redux'
import { autoLogin } from './store/ayncThunks/authThunk'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    try {
      // Automatically log in the user from cookies stored when the app loads
      ; (async () => dispatch(autoLogin())
      )()
    } catch (error) {
      console.error('Error during auto login:', error)
    }
  }, [])

  return (
    <>
      <div className='h-screen overflow-hidden'>
        <Navbar />
        <div className='h-full overflow-auto flex'>
          <SideBar />
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App
