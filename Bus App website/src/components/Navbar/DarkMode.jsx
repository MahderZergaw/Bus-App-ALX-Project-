import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";

const DarkMode = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div className="flex items-center cursor-pointer">
      {theme === "light" ? (
        <FaMoon
          className="text-xl  dark:text-black hover:text-gray-900 transition duration-300 ml-10 "
          onClick={toggleTheme}
          aria-label="Switch to dark mode"
        />
      ) : (
        <IoSunnyOutline
          className="text-xl text-white hover:text-grey-600 transition duration-300 ml-10"
          onClick={toggleTheme}
          aria-label="Switch to light mode"
        />
      )}
    </div>
  );
};

export default DarkMode;
