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

function Navbar() {
    const { sidebarSize, toggleSidebar, uploadStatus, setUploadStatus } = useContext(displayContext)
    const { userData, loading, error } = useSelector((state) => state.auth)
    const dropdownRef = React.useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [dropdownVisible, setDropdownVisible] = React.useState(false);
    const [accountDropdown, setAccountDropdown] = React.useState(false);
    const [confirmLogout, setConfirmLogout] = React.useState(false)

    const options = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",

    }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownVisible(false);
            setAccountDropdown(false);
            setConfirmLogout(false);
        }
    };

    React.useEffect(() => {
        if (uploadStatus === "success") {
            toast.success(<p className=' font-sans font-semibold'>Video has been published</p>, options)
            setUploadStatus(""); // Reset status
        } else if (uploadStatus === "failed") {
            toast.error(<p className=' font-sans font-semibold'>Video uploading failed. Try again</p>, options)
            setUploadStatus(""); // Reset status
        } else null

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            setUploadStatus("")
        };
    }, [uploadStatus]);

    return (
        <>
            <nav className={`bg-black/85 backdrop-blur-md navbar top-0 px-2 py-1.5 text-center flex items-center justify-between z-20`}>
                <div className={`left flex items-center gap-x-4 w-1/3 max-lg2:pl-5 max-md2:pl-1 ${sidebarSize === "small" ? "pl-3" : ""} `}>
                    <div onClick={toggleSidebar}
                        className='hover:bg-gray-400/20 p-1.5 rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bg-transparent bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </div>
                    <div>
                        <img src={youtubeLogo} alt="Logo" />
                    </div>
                </div>
                <div className='search xl:w-2/5 md:w-1/2 m-auto flex w-1/3 h-9'>
                    <input className='w-11/12  rounded-l-full px-4 text-lg  border border-gray-600 focus-within:outline-none focus-within:border-blue-600 bg-inherit placeholder:text-gray-400' type="search" name="search-bar" id="" placeholder='Search' />

                    <button className='w-16 flex items-center justify-center bg-gray-600/40 rounded-r-full border border-gray-600 border-l-0'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bg-transparent bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </button>
                </div>
                <div className='w-1/3 flex items-center justify-end gap-x-8 pr-4'>
                    <div className='relative'>
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
                            <div ref={dropdownRef} className='absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg '>
                                <NavLink
                                    onClick={() => setDropdownVisible(prev => !prev)}
                                    to="/user/upload-video" className='block px-4 py-2 font-semibold rounded-t-md text-white hover:bg-gray-200 hover:text-black'>
                                    Upload Video
                                </NavLink>
                                <NavLink
                                    onClick={() => setDropdownVisible(prev => !prev)}
                                    to="/user/edit-video" className='block px-4 py-2 font-semibold  rounded-b-md text-white hover:bg-gray-200 hover:text-black'>
                                    Edit Video Details
                                </NavLink>
                            </div>
                        )}
                    </div>

                    <div className='flex items-center justify-end gap-x-8 pr-4'>
                        <div className='relative'>
                            <div
                                className='bg-blue-400/30 rounded-full overflow-hidden w-10 h-10 cursor-pointer flex items-center justify-center'
                                onClick={() => setAccountDropdown(prev => !prev)}
                            >
                                {
                                    userData?.user.avatar ?
                                        <img src={userData.user.avatar} className="object-cover min-w-full min-h-full" alt='avatar' />
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
                                    <div ref={dropdownRef} className='absolute z-[1000] top-12 right-10 mt-2 w-48 bg-gray-800 rounded-md shadow-lg'>
                                        {userData ? (
                                            <>
                                                <NavLink
                                                    onClick={() => setAccountDropdown(prev => !prev)}
                                                    to="/user/account"
                                                    className='select-none block px-4 py-2 rounded-t-md text-white font-semibold bg-gray-800 hover:bg-gray-200 hover:text-black'>
                                                    Your Account
                                                </NavLink>
                                                <div
                                                    onClick={() => { setConfirmLogout(() => true) }}
                                                    className='select-none block px-4 py-2 rounded-b-md text-white font-semibold bg-gray-800 focus:bg-gray-200 focus:text-black hover:bg-gray-200 hover:text-black'>
                                                    Logout
                                                </div>
                                                {confirmLogout && (
                                                    <div className="absolute text-center z-[1000] w-64 right-52 -top-5 mt-4 p-4 border border-gray-300 bg-gray-100 rounded shadow">
                                                        <p className="mb-4 text-black font-sans font-semibold">Are you sure you want to logout?</p>
                                                        <button
                                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mr-2"
                                                            onClick={() => {
                                                                dispatch(logout())
                                                                navigate("/")
                                                                setAccountDropdown(prev => !prev)
                                                                setConfirmLogout(() => false)
                                                            }}
                                                        >
                                                            Yes
                                                        </button>
                                                        <button
                                                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                                                            onClick={() => setConfirmLogout(() => false)}
                                                        >
                                                            No
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <NavLink
                                                    onClick={() => setAccountDropdown(prev => !prev)}
                                                    to="/auth/api/v1/login"
                                                    className='block px-4 py-2 rounded-t-md text-white font-semibold bg-gray-800 hover:bg-gray-200 hover:text-black'>
                                                    Login
                                                </NavLink>
                                                <NavLink
                                                    onClick={() => setAccountDropdown(prev => !prev)}
                                                    to="auth/api/v1/signup"
                                                    className='block px-4 py-2 rounded-b-md text-white font-semibold bg-gray-800 hover:bg-gray-200 hover:text-black'>
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
            <ToastContainer />
        </>

    )
}

export default Navbar