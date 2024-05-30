import React from "react";
import Image1 from "../../assets/Hero_Images/Image1.jpg";
import Image2 from "../../assets/Hero_Images/Image2.jpg";
import Image3 from "../../assets/Hero_Images/Image3.jpg";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

const ImageList = [
  {
    id: 1,
    img: Image1,
    title: "Ride Smart, Save Big with CityBus Discounts!",
    description:
      "Hop on board and enjoy exclusive discounts on your favorite city routes. Travel smart and save more with CityBus!",
  },
  {
    id: 2,
    img: Image2,
    title: "Explore the City for Less with Our Special Ride Offers!",
    description:
      "Discover the best of the city at unbeatable prices. Enjoy discounted rides and explore every corner with ease and comfort.",
  },
  {
    id: 3,
    img: Image3,
    title: "Your Ticket to Affordable City Adventures!",
    description:
      "Journey through the city with amazing discounts on selected routes. Experience the convenience and savings with every ride!",
  },
];

const Hero = () => {
  const history = useNavigate();

  const handleBookNowClick = () => {
    history("/booking");
  };

  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  return (
    <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200">
      <div className="h-[700px] w-[700px] bg-primary/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z-9"></div>
      <div className="container pb-8 sm:pb-0">
        <Slider {...settings}>
          {ImageList.map((data) => (
            <div key={data.id}>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                  <h1
                    data-aos="zoom-out"
                    data-aos-duration="500"
                    data-aos-once="true"
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold"
                  >
                    {data.title}
                  </h1>
                  <p
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-once="100"
                    className="text-sm"
                  >
                    {data.description}
                  </p>
                  <div data-aos="fade-up" data-aos-duration="500" data-aos-once="300">
                    <button
                      onClick={handleBookNowClick}
                      className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full"
                    >
                      Book A Seat Now
                    </button>
                  </div>
                </div>
                <div className="order-1 sm:order-2">
                  <div data-aos="zoom-in" data-aos-once="true" className="relative z-10">
                    <img
                      src={data.img}
                      alt=""
                      className="w-[300px] h-[300px] sm:h-[350px] sm:w-[450px] sm:scale-105 lg:scale-120 object-contain rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;
