import React, { useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from '../../redux/uiSlice';

const DarkMode = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.ui.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark"); // Keep localStorage in sync
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="flex items-center cursor-pointer">
      {isDarkMode ? (
        <IoSunnyOutline
          className="text-xl text-white hover:text-gray-700 transition duration-300 ml-10"
          onClick={handleToggle}
          aria-label="Switch to light mode"
        />
      ) : (
        <FaMoon
          className="text-xl dark:text-black hover:text-gray-200 transition duration-300 ml-10"
          onClick={handleToggle}
          aria-label="Switch to dark mode"
        />
      )}
    </div>
  );
};

export default DarkMode;