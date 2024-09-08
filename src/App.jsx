import './App.css'
import { ContextProvider } from './context/displayContext'
import { Navbar, Home } from "./components"
import { autoLogin } from './store/ayncThunks/authThunk'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()

  try {
    async function login() {
      const res = await dispatch(autoLogin())

      if (res.type.includes("rejected")) {
        throw res.error
      }
    }
    login()
  } catch (error) {
    console.error('Error during auto login:', error)

  }


  return (
    <>
      <ContextProvider>

        <div className='h-screen overflow-hidden'>
          <Navbar />
          < Home />
        </div>

      </ContextProvider>

    </>
  )
}

export default App
