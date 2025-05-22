import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-indigo-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button
            className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className} transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50`}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
}
