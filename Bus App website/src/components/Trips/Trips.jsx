import React from 'react';
import Image1 from "../../assets/Trip_Images/Image1.jpg";
import Image2 from "../../assets/Trip_Images/Image2.jpg";
import Image3 from "../../assets/Trip_Images/Image3.jpg";
import Image4 from "../../assets/Trip_Images/Image4.jpg";
import Image5 from "../../assets/Trip_Images/Image5.jpg";
import { FaStar } from "react-icons/fa";


const PlacesData = [
    {
        id: 1,
        img: Image1,
        title: "Mumbai",
        rating: 4.5,
        visited: "123,000 trips",
        aosDelay: "0",
    },
    {
        id: 2,
        img: Image2,
        title: "China",
        rating: 3.0,
        visited: "90,000 trips",
        aosDelay: "200",
    },
    {
        id: 3,
        img: Image3,
        title: "Mumbai",
        rating: 4.0,
        visited: "100,000 trips",
        aosDelay: "400",
    },
    {
        id: 4,
        img: Image4,
        title: "Tokyo",
        rating: 4.5,
        visited: "120,000 trips",
        aosDelay: "600",
    },
    {
        id: 5,
        img: Image5,
        title: "San Francisco",
        rating: 4.5,
        visited: "70,000 trips",
        aosDelay: "800",
    },
];

const Trips = () => {
  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* Header section */}
        <div
          className="text-center mb-10 max-w-[600px]
        mx-auto"
        >
          <p data-aos="fade-up" className="text-lg text-primary">
            Top Visited Destinations for you
          </p>
          <h1 data-aos="fade-up" className="text-4xl font-bold">
            Top Rated Destinations
          </h1>
          <p data-aos="fade-up" className="text-m text-gray-400">
            Discover unbeatable trip prices for your next adventure with ADDIS
            RIDE.
          </p>
        </div>
        {/* Body section */}
        <div>
          <div
            className="grid grid-cols-1 sm:grid-cols-3
           md:grid-cols-4 lg:grid-cols-5 place-items-center
           gap-5"
          >
            {/* card section */}
            {PlacesData.map((data) => (
              <div
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                key={data.id}
                className="space-y-3"
              >
                <img
                  src={data.img}
                  alt=""
                  className="h-[220px] w-[150px]
                   object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{data.title}</h3>
                  <p className="text-sm text-gray-600">{data.visited}</p>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span>{data.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trips