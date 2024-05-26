import React from "react";
import Image1 from "../../assets/Terminals/Image1.jpg";
import Image2 from "../../assets/Terminals/Image2.jpg";
import Image3 from "../../assets/Terminals/Image3.jpg";
import { FaStar } from "react-icons/fa";

const TerminalsData = [
  {
    id: 1,
    img: Image1,
    title: "Central City Bus Terminal",
    description:
      "Central City Bus Terminal is the bustling heart of the city's transportation network. Conveniently located in the downtown area, this modern facility offers a wide range of amenities including free Wi-Fi, comfortable waiting areas, and a variety of dining options.",
  },
  {
    id: 2,
    img: Image2,
    title: "Riverside Bus Station",
    description:
      "Situated along the scenic Riverside Parkway, Riverside Bus Station combines the charm of a picturesque location with the convenience of modern transportation services. The terminal features spacious seating, clean restrooms, and a helpful information desk.",
  },
  {
    id: 3,
    img: Image3,
    title: "Northside Transit Center",
    description:
      "Northside Transit Center serves as a crucial link for passengers traveling to the northern suburbs and nearby towns. This recently renovated terminal offers enhanced accessibility features, ample parking, and a safe, secure environment.",
  },
];

const Terminals = ({ handleOrderPopup }) => {
  return (
    <div>
      <div className="container">
        {/* Header section */}
        <div className="text-left mb-24">
          <p data-aos="fade-up" className="text-lg text-primary">
            Bus Terminals for you
          </p>
          <h1 data-aos="fade-up" className="text-4xl font-bold">
            Terminal Points
          </h1>
          <p data-aos="fade-up" className="text-m text-gray-400">
            Planning a weekend getaway? a cross-country journey, or a daily
            commute, we offer the best rates to make your travels more
            affordable. Book now and enjoy top-notch service at the best prices
            available.
          </p>
        </div>
        {/* Body section */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2
        md:grid-cols-3 gap-20 md:gap-5 place-items-center"
        >
          {TerminalsData.map((data) => (
            <div
              data-aos="zoom-in"
              className="rounded-2xl bg-white dark:bg-gray-800
            hover:bg-primary/80 dark:hover:bg-primary
            hover:text-white relative shadow-xl
            duration-300 group max-w-[300px]"
              key={data.id}
            >
              {/* Image section */}
              <div className="h-[100px]">
                <img
                  src={data.img}
                  alt=""
                  className="max-w-[140px] block mx-auto
                transform -translate-y-20
                group-hover:scale-105 duration-300
                drop-shadow-md"
                />
              </div>
              {/* details section */}
              <div className="p-4 text-center">
                {/* star rating */}
                <div
                  className="w-full flex items-center
                justify-center gap-1"
                >
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                </div>
                <h1 className="text-xl font-bold">{data.title}</h1>
                <p
                  className="text-gray-500 group-hover:text-white
                duration-300 text-sm line-clamp-2"
                >
                  {data.description}
                </p>
                <button
                  className="bg-primary hover:scale-105
                duration-300 text-white py-1 px-4
                rounded-full mt-4 group-hover:bg-white
                group-hover:text-primary"
                  onClick={handleOrderPopup}
                >
                  Book a Seat
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Terminals;
