import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBtn(props) {
    return (
        <NavLink
            to={props.to}
            // onClick={(e) => handleNavigation(e)}
            className={({ isActive }) =>
                `${isActive ? "bg-gray-400/20" : ""}
            hover:bg-gray-400/20 w-full text-left p-2 font-medium rounded-lg flex items-center gap-3 cursor-pointer 
            ${!window.location.href.includes("/videos/play") && "max-md2:flex-row max-md2:items-center max-md2:gap-3 max-lg2:flex-col max-lg2:gap-2 max-lg2:p-3"}
            ${props.className}`
            }
        >
            {props.icon}
            <span className={`md:text-center md:text-xs lg2:text-sm  ${props.nameClasses}`}>{props.name}</span>
        </NavLink>
    );
}

export default NavBtn;