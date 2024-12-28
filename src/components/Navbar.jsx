import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import { NavLink, redirect, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../assets/LoadingSpinner.svg';
import { displayContext } from '../context/displayContext'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/asyncThunks/authThunk';
import youtubeLogo from '../assets/YoutubeLogo.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import SearchBar from './SearchBar';
import ConfirmationPopup from '../utils/ConfirmationPopup';
import { MdArrowBack } from 'react-icons/md';
import { FaBars } from 'react-icons/fa6';
import { FaSpinner } from 'react-icons/fa';
import { googleLogout } from '@react-oauth/google';


function Navbar() {
    const { sidebarSize, toggleSidebar } = useContext(displayContext)
    const { userData, loading, error } = useSelector((state) => state.auth)
    const dropdownRef = React.useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [dropdownVisible, setDropdownVisible] = React.useState(false);
    const [accountDropdown, setAccountDropdown] = React.useState(false);
    const [confirmLogout, setConfirmLogout] = React.useState(false)

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownVisible(false);
            setAccountDropdown(false);
            setConfirmLogout(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <ToastContainer limit={1} />
            <nav className={`bg-[rgb(16,16,16)] backdrop-blur-md navbar top-0 px-3 max-sm:px-2 py-1.5 text-center flex items-center justify-between z-20`}>

                <div className={`left flex items-center gap-x-4 bg-red-20 w-1/3 pl-0 md2:pl-3 lg2:pl-0  ${sidebarSize === "small" ? "!pl-3 max-md2:!pl-1 " : ""} `}>
                    <div onClick={toggleSidebar}
                        className='hover:bg-gray-400/20 p-2 rounded-full max-sm:hidden'>
                        <FaBars className='text-xl' />
                    </div>
                    <div>
                        <img src={youtubeLogo} alt="Logo" />
                    </div>
                </div>
                <SearchBar />
                <div className='w-1/3 flex items-center justify-end gap-x-8 sm:pr-4'>

                    {/* video options */}
                    <div className='relative z-50 max-sm:hidden'>
                        <div
                            className='hover:bg-gray-400/20 p-2 rounded-full cursor-pointer'
                            onClick={() => setDropdownVisible(prev => !prev)}
                        >
                            {/* icon of create video */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" viewBox="0 0 24 24" fill='currentColor' className='bg-transparent' focusable="false" aria-hidden="true">
                                <path d="M14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2zm3-7H3v12h14v-6.39l4 1.83V8.56l-4 1.83V6m1-1v3.83L22 7v8l-4-1.83V19H2V5h16z"></path>
                            </svg>
                        </div>
                        {dropdownVisible && (
                            ReactDOM.createPortal(
                                <div ref={dropdownRef} className='absolute top-12 right-32 z-50 mt-2 w-48 bg-zinc-800 rounded-md shadow-lg '>
                                    <NavLink
                                        onClick={() => setDropdownVisible(prev => !prev)}
                                        to="/user/upload-video" className='block px-4 py-2 font-semibold rounded-t-md text-white hover:bg-gray-200 hover:text-black'>
                                        Upload Video
                                    </NavLink>
                                    <NavLink
                                        onClick={() => setDropdownVisible(prev => !prev)}
                                        to="/users/current-user/dashboard/videos"
                                        className='block px-4 py-2 font-semibold  rounded-b-md text-white hover:bg-gray-200 hover:text-black'>
                                        Edit Video Details
                                    </NavLink>
                                </div>,
                                document.body)
                        )}
                    </div>

                    {/* account options */}
                    <div className='flex items-center justify-end gap-x-8 '>
                        <div className='relative'>
                            <div
                                className='bg-blue-400/30 rounded-full overflow-hidden w-10 h-10 cursor-pointer flex items-center justify-center'
                                onClick={() => setAccountDropdown(prev => !prev)}
                            >
                                {
                                    userData?.avatar ?
                                        <img src={userData.avatar} className="object-cover min-w-full min-h-full" alt='avatar' />
                                        : loading ?
                                            <img src={LoadingSpinner} alt="loading" />
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" fill="currentColor" className="bg-transparent bi bi-person-exclamation" viewBox="0 0 16 16">
                                                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                                                <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-3.5-2a.5.5 0 0 0-.5.5v1.5a.5.5 0 0 0 1 0V11a.5.5 0 0 0-.5-.5m0 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
                                            </svg>
                                }
                            </div>
                            {accountDropdown &&
                                ReactDOM.createPortal(
                                    <div ref={dropdownRef} className='absolute z-50 top-12 right-10 mt-2 w-48 bg-zinc-800 rounded-md shadow-lg'>
                                        {userData ? (
                                            <>
                                                <NavLink
                                                    onClick={() => setAccountDropdown(prev => !prev)}
                                                    to="/dashboard"
                                                    className='select-none block px-4 py-2 rounded-t-md text-white font-semibold bg-zinc-800 hover:bg-gray-200 hover:text-black'>
                                                    Your Account
                                                </NavLink>
                                                <div
                                                    onClick={() => { setConfirmLogout(() => true) }}
                                                    className='select-none block px-4 py-2 rounded-b-md text-white font-semibold bg-zinc-800 focus:bg-gray-200 focus:text-black hover:bg-gray-200 hover:text-black'>
                                                    Logout
                                                </div>
                                                {/* popup before logout */}
                                                {confirmLogout
                                                    && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                                        <div className="bg-white relative rounded-lg p-6 max-w-md">
                                                            <MdArrowBack
                                                                onClick={() => setConfirmLogout(false)}
                                                                className='absolute top-2 left-2 fill-black text-3xl' />
                                                            <h2 className="text-3xl font-bold text-black mb-3 mt-5 font-sans">You Sure?</h2>
                                                            <p className="text-base text-gray-600 mb-6">Aren't You happy with Us? You really want to logout from your account?</p>
                                                            <div className="flex justify-end">
                                                                <button
                                                                    className=" text-red-600 text-lg font-bold px-4 py-2 rounded-md mr-2"
                                                                    onClick={async () => {
                                                                        googleLogout();
                                                                        await dispatch(logout())
                                                                        navigate("/")
                                                                        setAccountDropdown(prev => !prev)
                                                                        setConfirmLogout(() => false)
                                                                    }}>
                                                                    {loading
                                                                        ? <FaSpinner className='animate-spin text-center fill-red-600 text-2xl mx-auto' />
                                                                        : "Logout"
                                                                    }
                                                                </button>
                                                                <button
                                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                                                                    onClick={() => { setConfirmLogout(false); setAccountDropdown(false) }}
                                                                >
                                                                    Stay here
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </>
                                        ) : (
                                            <>
                                                <NavLink
                                                    onClick={() => setAccountDropdown(prev => !prev)}
                                                    to="/auth/api/v1/login"
                                                    className='block px-4 py-2 rounded-t-md text-white font-semibold bg-zinc-800 hover:bg-gray-200 hover:text-black'>
                                                    Login
                                                </NavLink>
                                                <NavLink
                                                    onClick={() => setAccountDropdown(prev => !prev)}
                                                    to="auth/api/v1/signup"
                                                    className='block px-4 py-2 rounded-b-md text-white font-semibold bg-zinc-800 hover:bg-gray-200 hover:text-black'>
                                                    Create an Account
                                                </NavLink>
                                            </>
                                        )}
                                    </div>,
                                    document.body
                                )
                            }
                        </div>
                    </div>

                </div>
            </nav >
        </>

    )
}

export default Navbar