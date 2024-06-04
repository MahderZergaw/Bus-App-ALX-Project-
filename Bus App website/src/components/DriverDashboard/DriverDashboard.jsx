import React from "react";
import Hero from "../Hero/Hero";
import Trips from "../Trips/Trips";
import Terminals from "../Bus Terminals/Terminals";
import Banner from "../Banner/Banner";
import Subscribe from "../Subscribe/Subscribe";
import Testimonials from "../Testimonials/Testimonials";
import Footer from "../Footer/Footer";
import BannerImage from "../../assets/Bus.jpg";
import { GrSecure } from "react-icons/gr";
import { MdQRCode } from 'react-icons/md';
import { IoFastFood } from "react-icons/io5";
import { GiFoodTruck } from "react-icons/gi";

const DriverDashboard = () => {
  return (
    <div
      className="min-h-[550px] flex
    justify-center items-center py-12
    sm:py-0"
    >
      <div className="container">
        <div
          className="grid grid-cols-1 sm:grid-cols-2
            gap-6 items-center"
        >
          {/* image section */}
          <div data-aos="zoom-in">
            <img
              src={BannerImage}
              alt=""
              className="max-w-[400px] h-[350px] w-full
            mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
            />
          </div>
          {/* text details section */}
          <div
            className="flex flex-col justify-center
          gap-6 sm:pt-0"
          >
            <h1 data-aos="fade-up" className="text-3xl sm:text-4xl font-bold">
              Welcome to Driver Dashboard
            </h1>
            {/* <p
              data-aos="fade-up"
              className="text-sm text-gray-500 tracking-wide
            leading-5"
            >
              Catch the Savings, Ride the Bus!
            </p> */}
            <div className="flex flex-col gap-4">
              <div data-aos="fade-up" className="flex items-center gap-4">
                <MdQRCode
                  className="text-4xl h-12 w-12 shadow-sm
                        p-4 rounded-full bg-violet-100 dark:bg-yellow-400"
                />
                <button>View Passengers</button>
              </div>
              <div data-aos="fade-up" className="flex items-center gap-4">
                <IoFastFood
                  className="text-4xl h-12 w-12
                        shadow-sm p-4 rounded-full bg-yellow-400 dark:-orange-400"
                />
                <button>Scan Passenger QR</button>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;


