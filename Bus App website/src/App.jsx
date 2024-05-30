import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup.jsx";
import RegisterDriver from "./components/RegisterDriver/RegisterDriver.jsx";
import RegisterUser from "./components/RegisterUser/RegisterUser.jsx";
import UserDashboard from "./components/UserDashboard/UserDashboard.jsx";
import DriverDashboard from "./components/DriverDashboard/DriverDashboard.jsx";
import BookingPage from "./components/BookingPage/BookingPage.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import Popup from "./components/Popup/Popup.jsx"; 

const App = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <Navbar handleOrderPopup={handleOrderPopup} />
      <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
      <Routes>
        <Route
          path="/"
          element={<LandingPage handleOrderPopup={handleOrderPopup} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/RegisterDriver" element={<RegisterDriver />} />
        <Route path="/RegisterUser" element={<RegisterUser />} />
        <Route path="/driver/form" element={<DriverDashboard />} />
        <Route path="/user/form" element={<UserDashboard />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
