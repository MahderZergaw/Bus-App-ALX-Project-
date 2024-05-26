import React from "react";
import Img1 from "../../assets/Subs-Image.jpg";

const SubscribeImage = {
  backgroundImage: `url(${Img1})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroungSize: "cover",
  height: "100%",
  width: "100%",
};

const Subscribe = () => {
  return (
    <div
      data-aos="zoom-in"
      className="mb-20 bg-gray-100 dark:bg-gray-800
    text-white"
      style={SubscribeImage}
    >
      <div className="container backdrop-blur-sm py-10">
        <div className="space-y-6 max-w-xl mx-auto">
          <h1
            className="text-2xl text-center sm:text-left
          sm:text-4xl font-semibold"
          >
            Get the Latest Travel/Traffic News
          </h1>
          <input
            data-aos="fade-up"
            type="text"
            placeholder="Enter your email"
            className="w-full p-3"
          />
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
