import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBtn(props) {
    return (
        <NavLink
            to={props.to}
            // onClick={(e) => handleNavigation(e)}
            className={({ isActive }) =>
                `${isActive ? "bg-gray-400/20" : ""}
            ${props.className ? props.className : "lg:flex-row  lg:gap-3"}
            hover:bg-gray-400/20 w-full text-left font-medium rounded-lg flex  items-center flex-row gap-3 p-2 cursor-pointer 
            ${!window.location.href.includes("/videos/play") && "sm:flex-row sm:gap-3 md:flex-col md:gap-2 md:p-3"}
            `
            }
        >
            {props.icon}
            <p className={`md:text-center md:text-xs lg:text-sm  ${props.nameClasses}`}>{props.name}</p>
        </NavLink>
    );
}

export default NavBtn;

// max-md2:flex-row max-md2:items-center max-md2:gap-3 max-lg2:flex-col max-lg2:gap-2 max-lg2:p-3

// <NavBtn
// icon={<svg xmlns="http://www.w3.org/2000/svg" className='bg-transparent' fill='currentColor' height="20" viewBox="0 0 16 16" width="20" focusable="false" aria-hidden="true" ><path d="M4.97 12.65 9.62 8 4.97 3.35l.71-.71L11.03 8l-5.35 5.35-.71-.7z"></path></svg>}
// name="You"
// className={`md:hidden flex flex-row-reverse justify-end lg:flex lg:flex-row-reverse hover:none  ${sidebarSize === "small" ? "hidden" : ""}`}
// nameClasses="lg:text-2xl sm:text-2xl "
// />