// import React from "react";
import { useSelector } from "react-redux";

export default function Button({ children, onClick, type = "button", disabled = false ,className = ""}) {
  // Access the theme from Redux
  const theme = useSelector((state) => state.ui.theme);

  // Define base styles
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all";

  // Define styles for different themes
  
  const themeStyles = {
    false: "bg-primary/40 hover:bg-blue-600 ",
    true: "bg-[#023571] text-white hover:bg-gray-600 ",
  };

  // Add disabled styles
  const disabledStyles = "bg-gray-400 text-gray-700 cursor-not-allowed";

  return (
    <button
      type={type}
      className={`${baseStyles} ${themeStyles[theme]} ${disabled ? disabledStyles : ""} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
