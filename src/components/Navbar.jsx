import React, { useContext, useReducer } from 'react'
import { NavLink } from 'react-router-dom';
import LoadingSpinner from '../assets/LoadingSpinner.svg';
import { displayContext } from '../context/displayContext'
import { Login } from "./"
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { logout } from '../store/ayncThunks/authThunk';

function Navbar() {
    const { sidebarSize, toggleSidebar } = useContext(displayContext)
    const { userData, loading, error } = useSelector((state) => state.auth)
    const dropdownRef = React.useRef()
    const dispatch = useDispatch()

    const [dropdownVisible, setDropdownVisible] = React.useState(false);
    const [accountDropdown, setAccountDropdown] = React.useState(false);
    const [confirmLogout, setConfirmLogout] = React.useState(false)

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownVisible(false);
            setAccountDropdown(false);
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
            <nav className={`bg-customDark backdrop-blur-md navbar z-20 top-0 p-2 text-center flex items-center justify-between `}>
                <div className={`left flex items-center gap-x-4 w-1/3 max-lg2:pl-3 max-md2:pl-0 ${sidebarSize === "small" ? "pl-4" : ""} `}>
                    <div onClick={toggleSidebar}
                        className='hover:bg-gray-400/20 p-2 rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bg-transparent bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" id="yt-logo-updated-svg_yt3" width={100} className='bg-transparent' viewBox="0 0 90 20" fill='currentColor' focusable="false" aria-hidden="">
                            <svg id="yt-logo-updated_yt3" viewBox="0 0 90 20" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <path d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" fill="#FF0000"></path>
                                    <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white"></path>
                                </g>
                                <g>
                                    <g id="youtube-paths_yt3">
                                        <path d="M34.6024 13.0036L31.3945 1.41846H34.1932L35.3174 6.6701C35.6043 7.96361 35.8136 9.06662 35.95 9.97913H36.0323C36.1264 9.32532 36.3381 8.22937 36.665 6.68892L37.8291 1.41846H40.6278L37.3799 13.0036V18.561H34.6001V13.0036H34.6024Z"></path>
                                        <path d="M41.4697 18.1937C40.9053 17.8127 40.5031 17.22 40.2632 16.4157C40.0257 15.6114 39.9058 14.5437 39.9058 13.2078V11.3898C39.9058 10.0422 40.0422 8.95805 40.315 8.14196C40.5878 7.32588 41.0135 6.72851 41.592 6.35457C42.1706 5.98063 42.9302 5.79248 43.871 5.79248C44.7976 5.79248 45.5384 5.98298 46.0981 6.36398C46.6555 6.74497 47.0647 7.34234 47.3234 8.15137C47.5821 8.96275 47.7115 10.0422 47.7115 11.3898V13.2078C47.7115 14.5437 47.5845 15.6161 47.3329 16.4251C47.0812 17.2365 46.672 17.8292 46.1075 18.2031C45.5431 18.5771 44.7764 18.7652 43.8098 18.7652C42.8126 18.7675 42.0342 18.5747 41.4697 18.1937ZM44.6353 16.2323C44.7905 15.8231 44.8705 15.1575 44.8705 14.2309V10.3292C44.8705 9.43077 44.7929 8.77225 44.6353 8.35833C44.4777 7.94206 44.2026 7.7351 43.8074 7.7351C43.4265 7.7351 43.156 7.94206 43.0008 8.35833C42.8432 8.77461 42.7656 9.43077 42.7656 10.3292V14.2309C42.7656 15.1575 42.8408 15.8254 42.9914 16.2323C43.1419 16.6415 43.4123 16.8461 43.8074 16.8461C44.2026 16.8461 44.4777 16.6415 44.6353 16.2323Z"></path>
                                        <path d="M56.8154 18.5634H54.6094L54.3648 17.03H54.3037C53.7039 18.1871 52.8055 18.7656 51.6061 18.7656C50.7759 18.7656 50.1621 18.4928 49.767 17.9496C49.3719 17.4039 49.1743 16.5526 49.1743 15.3955V6.03751H51.9942V15.2308C51.9942 15.7906 52.0553 16.188 52.1776 16.4256C52.2999 16.6631 52.5045 16.783 52.7914 16.783C53.036 16.783 53.2712 16.7078 53.497 16.5573C53.7228 16.4067 53.8874 16.2162 53.9979 15.9858V6.03516H56.8154V18.5634Z"></path>
                                        <path d="M64.4755 3.68758H61.6768V18.5629H58.9181V3.68758H56.1194V1.42041H64.4755V3.68758Z"></path>
                                        <path d="M71.2768 18.5634H69.0708L68.8262 17.03H68.7651C68.1654 18.1871 67.267 18.7656 66.0675 18.7656C65.2373 18.7656 64.6235 18.4928 64.2284 17.9496C63.8333 17.4039 63.6357 16.5526 63.6357 15.3955V6.03751H66.4556V15.2308C66.4556 15.7906 66.5167 16.188 66.639 16.4256C66.7613 16.6631 66.9659 16.783 67.2529 16.783C67.4974 16.783 67.7326 16.7078 67.9584 16.5573C68.1842 16.4067 68.3488 16.2162 68.4593 15.9858V6.03516H71.2768V18.5634Z"></path>
                                        <path d="M80.609 8.0387C80.4373 7.24849 80.1621 6.67699 79.7812 6.32186C79.4002 5.96674 78.8757 5.79035 78.2078 5.79035C77.6904 5.79035 77.2059 5.93616 76.7567 6.23014C76.3075 6.52412 75.9594 6.90747 75.7148 7.38489H75.6937V0.785645H72.9773V18.5608H75.3056L75.5925 17.3755H75.6537C75.8724 17.7988 76.1993 18.1304 76.6344 18.3774C77.0695 18.622 77.554 18.7443 78.0855 18.7443C79.038 18.7443 79.7412 18.3045 80.1904 17.4272C80.6396 16.5476 80.8653 15.1765 80.8653 13.3092V11.3266C80.8653 9.92722 80.7783 8.82892 80.609 8.0387ZM78.0243 13.1492C78.0243 14.0617 77.9867 14.7767 77.9114 15.2941C77.8362 15.8115 77.7115 16.1808 77.5328 16.3971C77.3564 16.6158 77.1165 16.724 76.8178 16.724C76.585 16.724 76.371 16.6699 76.1734 16.5594C75.9759 16.4512 75.816 16.2866 75.6937 16.0702V8.96062C75.7877 8.6196 75.9524 8.34209 76.1852 8.12337C76.4157 7.90465 76.6697 7.79646 76.9401 7.79646C77.2271 7.79646 77.4481 7.90935 77.6034 8.13278C77.7609 8.35855 77.8691 8.73485 77.9303 9.26636C77.9914 9.79787 78.022 10.5528 78.022 11.5335V13.1492H78.0243Z"></path>
                                        <path d="M84.8657 13.8712C84.8657 14.6755 84.8892 15.2776 84.9363 15.6798C84.9833 16.0819 85.0821 16.3736 85.2326 16.5594C85.3831 16.7428 85.6136 16.8345 85.9264 16.8345C86.3474 16.8345 86.639 16.6699 86.7942 16.343C86.9518 16.0161 87.0365 15.4705 87.0506 14.7085L89.4824 14.8519C89.4965 14.9601 89.5035 15.1106 89.5035 15.3011C89.5035 16.4582 89.186 17.3237 88.5534 17.8952C87.9208 18.4667 87.0247 18.7536 85.8676 18.7536C84.4777 18.7536 83.504 18.3185 82.9466 17.446C82.3869 16.5735 82.1094 15.2259 82.1094 13.4008V11.2136C82.1094 9.33452 82.3987 7.96105 82.9772 7.09558C83.5558 6.2301 84.5459 5.79736 85.9499 5.79736C86.9165 5.79736 87.6597 5.97375 88.1771 6.32888C88.6945 6.684 89.059 7.23433 89.2707 7.98457C89.4824 8.7348 89.5882 9.76961 89.5882 11.0913V13.2362H84.8657V13.8712ZM85.2232 7.96811C85.0797 8.14449 84.9857 8.43377 84.9363 8.83593C84.8892 9.2381 84.8657 9.84722 84.8657 10.6657V11.5641H86.9283V10.6657C86.9283 9.86133 86.9001 9.25221 86.846 8.83593C86.7919 8.41966 86.6931 8.12803 86.5496 7.95635C86.4062 7.78702 86.1851 7.7 85.8864 7.7C85.5854 7.70235 85.3643 7.79172 85.2232 7.96811Z"></path>
                                    </g>
                                </g>
                            </svg>
                        </svg>
                    </div>
                </div>
                <div className='search xl:w-2/5 md:w-1/2 m-auto flex w-1/3'>
                    <input className='w-11/12 h-10 rounded-l-full px-4 text-lg  border border-gray-600 focus-within:outline-none focus-within:border-blue-600 bg-inherit placeholder:text-gray-400' type="search" name="search-bar" id="" placeholder='Search' />

                    <button className='w-16 h-10 flex items-center justify-center bg-gray-600/40 rounded-r-full border border-gray-600 border-l-0'>
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" fill='currentColor' className='bg-transparent' focusable="false" aria-hidden="true">
                                <path d="M14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2zm3-7H3v12h14v-6.39l4 1.83V8.56l-4 1.83V6m1-1v3.83L22 7v8l-4-1.83V19H2V5h16z"></path>
                            </svg>
                        </div>
                        {dropdownVisible && (
                            <div ref={dropdownRef} className='absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-20'>
                                <NavLink
                                    onClick={() => setDropdownVisible(prev => !prev)}
                                    to="/user/upload-video" className='block px-4 py-2 font-semibold rounded-t-md text-white hover:bg-gray-200 hover:text-black'>
                                    Create a Video
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
                                className='bg-blue-400/30 rounded-full overflow-hidden w-12 h-12 cursor-pointer flex items-center justify-center'
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
                            {accountDropdown && (
                                <div ref={dropdownRef} className='absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-20'>
                                    {userData ? (
                                        <>
                                            <NavLink
                                                onClick={() => setAccountDropdown(prev => !prev)}
                                                to="/user/account" className='block px-4 py-2 rounded-t-md text-white font-semibold bg-gray-800 hover:bg-gray-200 hover:text-black'>
                                                Your Account
                                            </NavLink>
                                            <div
                                                onClick={() => {
                                                    setConfirmLogout(true)
                                                    
                                                }}
                                                className='block px-4 py-2 rounded-b-md text-white font-semibold bg-gray-800 focus:bg-gray-200 focus:text-black hover:bg-gray-200 hover:text-black'>
                                                Logout
                                            </div>
                                            {confirmLogout && (
                                                <div className="absolute w-64 right-52 -top-5  mt-4 p-4 border border-gray-300 bg-gray-100 rounded shadow">
                                                    <p className="mb-4 text-black font-sans font-semibold">Are you sure you want to logout?</p>
                                                    <button
                                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mr-2"
                                                        onClick={() => {
                                                            Cookies.remove("accessToken")
                                                            Cookies.remove("refreshToken")
                                                            dispatch(logout())
                                                            setAccountDropdown(prev => !prev)
                                                            setConfirmLogout(false)
                                                        }}
                                                    >
                                                        Yes
                                                    </button>
                                                    <button
                                                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                                                        onClick={() => setConfirmLogout(false) }
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
                                                to="/auth/api/v1/login" className='block px-4 py-2 rounded-t-md text-white font-semibold bg-gray-800 hover:bg-gray-200  hover:text-black'>
                                                Login
                                            </NavLink>
                                            <NavLink
                                                onClick={() => setAccountDropdown(prev => !prev)}
                                                to="auth/api/v1/signup" className='block px-4 py-2 rounded-b-md text-white font-semibold bg-gray-800 hover:bg-gray-200 hover:text-black'>
                                                Create an Account
                                            </NavLink>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>


                </div>
            </nav >
        </>

    )
}

export default Navbar