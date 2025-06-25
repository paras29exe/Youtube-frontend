import React from 'react'

function EditButton({ type = "button", text, editable, setEditable, thumbnailClick }) {
    return (
        <button
            type={type}
            className={`${editable ? "bg-white text-black" : ""} mx-auto border hover:bg-white hover:text-black backdrop-blur-md py-1.5 px-3 rounded-lg max-md:text-sm w-[80%] disabled:cursor-not-allowed`}
            onClick={() => {
                !thumbnailClick && setEditable(prev => !prev)
                // click on thumbnail to select new thumbnail image
                thumbnailClick && document.getElementById("thumbnail-in-editVideo").click()
            }}
            disabled={editable}
        >
            {text}
        </button>
    )
}

export default EditButton