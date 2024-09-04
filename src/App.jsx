import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import Videos from './components/Videos'

function App() {

  return (
    <>
    
      <div className='h-screen overflow-hidden'>
      <Navbar />
        < Home />
        {/* <Login /> */}
        {/* <Signup /> */}

      </div>
    </>
  )
}

export default App
