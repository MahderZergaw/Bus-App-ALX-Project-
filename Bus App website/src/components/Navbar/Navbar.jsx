import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import Logo from "../../assets/Logo.png";
import { FaBusAlt, FaBars, FaCaretDown } from "react-icons/fa";
import DarkMode from "./DarkMode";
import Button from "../Common/Button";
// import Textfield from "../Common/Textfield";

// import Button from '@mui/material/Button';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Navbar = ({ handleOrderPopup }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn, userRole } = useSelector((state) => state.auth);

    // State to toggle dropdown visibility
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        // Clear tokens from localStorage
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("is_driver");
        dispatch(logout()); // Update Redux state
        navigate("/"); // Redirect to home
    };

    const handleRegisterClick = (role) => {
        setShowDropdown(false); // Hide dropdown
        if (role === "driver") navigate("/RegisterDriver");
        if (role === "passenger") navigate("/RegisterUser");
    };

    return (
        <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
            <div className="container flex justify-between items-center py-4">
                {/* Logo */}
                <Link to="/" className="font-bold text-2xl flex gap-2">
                    <img src={Logo} alt="Logo" className="w-10 h-10 rounded-full" />
                    <span className="font-fancy text-xl">ADDIS RIDE</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden sm:flex items-center space-x-4">
                    {!isLoggedIn ? (
                        <>
                       
                            <button
                                onClick={() => navigate("/login")}
                              className=" text-black dark:text-white font-fancy"  
                            >
                                Sign In
                            </button>
                                                   <div className="relative ">
                                {/* <div> */}
                                {/* Register Button */}
                                 {/* <Button 
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="bg-gradient-to-r from-blue-500 to-blue-700 dark:from-slate-700 dark:to-slate-800 dark:text-white py-2 px-4 rounded-lg flex items-center"
                                >
                                   normal  <FaCaretDown className="ml-2" /> 
                                     
                                 </Button> */}
                                 <Button 
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="py-2 px-4 rounded-lg flex items-center font-fancy"
                                >
                                    Register  <FaCaretDown className="ml-2" /> 
                                     
                                 </Button>

                                {/* Dropdown Menu */}
                                {showDropdown && (
                                    // <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                                    <div className="absolute bg-white dark:bg-[#111827] right-0 mt-2 rounded-lg shadow-lg">
                                        <Button
                                            onClick={() => handleRegisterClick("driver")}
                                            className="bg-white dark:bg-[#111827] block w-full min-w-max text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 font-fancy"
                                        >
                                            Register Driver
                                        </Button>
                                        <Button
                                            onClick={() => handleRegisterClick("passenger")}
                                            className="bg-white dark:bg-[#111827] block min-w-max w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 font-fancy"
                                        >
                                            Register Passenger
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            {userRole === "passenger" && (
                                <Button
                                    onClick={handleOrderPopup}
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg flex items-center"
                                >
                                    Book Now <FaBusAlt className="ml-2" />
                                </Button>
                            )}
                            <Button
                                onClick={handleLogout}
                                className="bg-red-500  py-2 px-4 rounded-lg font-fancy"
                            >
                                Logout
                            </Button>
                        </>
                    )}
                    <DarkMode />
                </div>

                {/* Mobile Navigation */}
                <div className="sm:hidden">
                    <FaBars size={24} />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
