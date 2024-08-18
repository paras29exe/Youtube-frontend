import React from 'react'
import { NavLink } from 'react-router-dom'

function NavBtn(props) {

    const redirect = (e) => {
    //    e.preventDefault()
    //    alert(e.target.innerHTML)
       
    }
    return (
        <NavLink
        to={props.to}
        className={({isActive})=> `${isActive ? "bg-gray-400/20" : null} hover:bg-gray-400/20 bg-inherit w-full text-left p-2 font-medium rounded-lg flex items-center gap-3 cursor-pointer ${props.className} `}
        onClick={redirect}
        >
            {props.icon}
            {props.name}
        </NavLink>
    )
}

export default NavBtn