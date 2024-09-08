import './App.css'
import { LoginProvider } from './context/loginContext'
import { Navbar, Home } from "./components"

function App() {

  return (
    <>
      <LoginProvider>

        <div className='h-screen overflow-hidden'>
          <Navbar />
          < Home />
        </div>

      </LoginProvider>

    </>
  )
}

export default App
