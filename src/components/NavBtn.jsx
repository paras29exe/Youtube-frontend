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
                `${isActive ? "bg-gray-400/20" : ""} hover:bg-gray-400/20 w-full text-left p-2 font-medium rounded-lg flex items-center gap-3 cursor-pointer max-xl:flex-col max-xl:gap-2 max-xl:p-3 ${props.className}`
            }
            onClick={redirect}
        >
            {props.icon}
            <span className='max-xl:text-xxs max-xl:text-center'>{props.name}</span>
        </NavLink>
    );
}

export default NavBtn;