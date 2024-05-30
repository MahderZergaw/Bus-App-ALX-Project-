import React from "react";
import Hero from "../Hero/Hero";
import Trips from "../Trips/Trips";
import Terminals from "../Bus Terminals/Terminals";
import Banner from "../Banner/Banner";
import Subscribe from "../Subscribe/Subscribe";
import Testimonials from "../Testimonials/Testimonials";
import BookingPopup from "../BookingPopup/BookingPopup";
import Footer from "../Footer/Footer";


const UserDashboard = ({ handleOrderPopup }) => {
  return (
    <div
      className="bg-white dark:bg-gray-900
    dark:text-white duration-200"
    >
      <Hero handleOrderPopup={handleOrderPopup} />
    <BookingPopup />
      <Footer />
    </div>
  );
};

export default UserDashboard;
