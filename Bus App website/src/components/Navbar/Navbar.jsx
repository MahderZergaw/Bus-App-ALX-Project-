import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { FaBusAlt, FaCaretDown, FaBars, FaTimes } from "react-icons/fa";
import DarkMode from "./DarkMode";
import Dropdown from "./Dropdown";
import MobileMenu from "./MobileMenu";
import ROUTES from "../../constants/routes";

const Navbar = ({ handleOrderPopup }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState(null); // Store user role
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Check login state

  useEffect(() => {
    // Check if the user is logged in
    const accessToken = localStorage.getItem("access_token");
    const isDriver = localStorage.getItem("is_driver");

    if (accessToken) {
      setIsLoggedIn(true);
      setUserRole(isDriver === "true" ? "driver" : "passenger");
    } else {
      setIsLoggedIn(false);
      setUserRole(null); // Clear role for logged-out users
    }
  }, []);

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
    setDropdownOpen(false);
  };
  const LogoutClicked=() => {
     localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('is_driver'); 
    navigate(ROUTES.logout)
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLoginClick = () => {
    navigate(ROUTES.login);
  };

  const isMainPath = location.pathname === ROUTES.home;

  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          {/* Logo */}
          <Link to={ROUTES.home} className="font-bold text-2xl sm:text-3xl flex gap-2">
            <img src={Logo} alt="Logo" className="w-10 h-10 rounded-full" />
            <span className="font-fancy text-xl">ADDIS RIDE</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-4 pr-0 gap-8">
            {!isLoggedIn && isMainPath && (
              <>
                <button
                  className="font-fancy text-black dark:text-white"
                  onClick={handleLoginClick}
                >
                  Sign in
                </button>
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="font-fancy text-black bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 px-4 py-2 rounded-lg shadow-md dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-600 dark:hover:from-gray-800 dark:hover:to-gray-700 dark:text-white flex items-center gap-2"
                  >
                    Register <FaCaretDown />
                  </button>
                  {dropdownOpen && (
                    <Dropdown
                      links={[
                        { id: 1, name: "Register Driver", link: ROUTES.registerDriver },
                        { id: 2, name: "Register Passenger", link: ROUTES.registerUser },
                      ]}
                      toggle={() => setDropdownOpen(false)}
                    />
                  )}
                </div>
              </>
            )}

            {isLoggedIn && userRole === "driver" && (
              <button
                onClick={LogoutClicked}
                className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full"
              >
                Logout
              </button>
            )}

            {isLoggedIn && userRole === "passenger" && (
              <>
                <button
                  onClick={handleOrderPopup}
                  className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3"
                >
                  Book Now <FaBusAlt className="text-xl text-white" />
                </button>
                <button
                  onClick={() => navigate(ROUTES.logout)}
                  className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full"
                >
                  Logout
                </button>
              </>
            )}

            <DarkMode />
          </div>

          <button className="sm:hidden" onClick={toggleSideMenu}>
            {sideMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {sideMenuOpen && <MobileMenu toggle={toggleSideMenu} />}
    </div>
  );
};

export default Navbar;
