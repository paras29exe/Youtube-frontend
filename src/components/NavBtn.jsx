import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBtn(props) {
    const redirect = (e) => {
        // e.preventDefault();
        // alert(e.target.innerHTML);
    };

    return (
        <NavLink
            to={props.to}
            className={({ isActive }) => 
                `${isActive ? "bg-gray-400/20" : ""} hover:bg-gray-400/20 w-full text-left p-2 pl-4 font-medium rounded-lg flex items-center gap-3 cursor-pointer max-lg2:flex-col max-lg2:gap-2 max-lg2:p-3 max-lg2:m-1 ${props.className}`
            }
            onClick={redirect}
        >
            {props.icon}
            <span className={`max-lg2:text-xxs max-lg2:text-center ${props.nameClasses}`}>{props.name}</span>
        </NavLink>
    );
}

export default NavBtn;