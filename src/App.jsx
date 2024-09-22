import './App.css'
import { Navbar, Home, VideoUpload, Signup } from "./components"
import { autoLogin } from './store/ayncThunks/authThunk'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()

  try {
    // Automatically log in the user from cookies stored when the app loads
    ;(
      async () => dispatch(autoLogin()) 
      )()
  } catch (error) {
    console.error('Error during auto login:', error)
  }

  return (
    <>
        <div className='h-screen overflow-hidden'>
          <Navbar/>
          {/* <Home /> */}
          <VideoUpload />
    {/* <Signup/> */}
        </div>
    </>
  )
}

export default App
