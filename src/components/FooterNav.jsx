import React from 'react'
import { BiHome } from 'react-icons/bi'
import { FaHistory, FaHome, FaPlus, FaUsers } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'

function FooterNav() {
  return (
    <div className='w-full max-h-20 fixed bottom-0 sm:hidden'>
      <div className='flex items-start w-full z-20 bg-black '>
        <NavLink
        to={"/"}
        className={({isActive}) => (`${isActive ? "bg-gray-300/20" : ""} flex-col w-full flex items-center gap-x-2 px-4 py-1.5`)}
        >
          <FaHome /> <span className="text-sm">Home</span>
        </NavLink>
        <NavLink
        to={"/user/upload-video"}
        className={({isActive}) => (`${isActive ? "bg-gray-300/20" : ""} flex-col w-full flex items-center gap-x-2 px-4 py-1.5`)}
        >
          <FaPlus /><span className="text-sm">Post</span>
        </NavLink>
        <NavLink
        to={"/subscriptions"}
        className={({isActive}) => (`${isActive ? "bg-gray-300/20" : ""} flex-col w-full flex items-center gap-x-2 px-4 py-1.5`)}
        >
          <FaUsers /><span className="text-sm">Subscriptions</span>
        </NavLink>
        <NavLink
        to={"/watch-history"}
        className={({isActive}) => (`${isActive ? "bg-gray-300/20" : ""} flex-col w-full flex items-center gap-x-2 px-4 py-1.5`)}
        >
          <FaHistory /><span className="text-sm">History</span>
        </NavLink>
       
      </div>
    </div>
  )
}

export default FooterNav