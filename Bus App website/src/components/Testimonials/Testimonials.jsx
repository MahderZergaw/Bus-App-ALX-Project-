import React from "react";
import Image1 from "../../assets/John-D..jpg";
import Image2 from "../../assets/Samantha-R.jpg";
import Image3 from "../../assets/Michael-T.jpg";
import Image4 from "../../assets/Emily-S.jpg";
import Slider from "react-slick";

const TestimonialData = [
  {
    id: 1,
    name: "John D.",
    img: Image1,
    text: "I had an incredible experience with ADDIS RIDE! The service was prompt, the buses were clean, and the drivers were professional. I'll definitely be using this service again.",
  },
  {
    id: 2,
    name: "Samantha R.",
    img: Image2,
    text: "Booking a ride with ADDIS RIDE was so easy and convenient. The entire process was smooth, and the ride was comfortable. Highly recommend it to anyone looking for reliable transportation.",
  },
  {
    id: 3,
    name: "Michael T.",
    img: Image3,
    text: "ADDIS RIDE has become my go-to service for all my travel needs. The seats are comfy, and the staff is always friendly and helpful. Keep up the great work!",
  },
  {
    id: 4,
    name: "Emily S.",
    img: Image4,
    text: "I recently used ADDIS RIDE for a family trip, and it was a fantastic experience. The bus was spacious, and we felt very safe throughout our journey. Excellent service and highly professional team.",
  },
];

const Testimonials = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-10 mb-10">
      <div
        className="container
        "
      >
        {/* header section */}
        <div
          className="text-center mb-10 max-w-[600px]
        mx-auto"
        >
          <p data-aos="fade-up" className="text-lg text-primary">
            What our Customers are saying
          </p>
          <h1 data-aos="fade-up" className="text-4xl font-bold">
            Testimonials
          </h1>
          <p data-aos="fade-up" className="text-m text-gray-400">
            Discover unbeatable trip prices for your next adventure with ADDIS
            RIDE.
          </p>
        </div>

        {/* Testimonial cards */}
        <div data-aos="zoom-in">
          <Slider {...settings}>
            {TestimonialData.map((data) => (
              <div className="my-6">
                <div
                  key={data.id}
                  className="flex flex-col gap-4 shadow-lg
            py-8 px-6 mx-4 rounded-xl dark:bg-gray-800
            bg-primary/10 relative"
                >
                  <div className="mb-4">
                    <img
                      src={data.img}
                      alt=""
                      className="rounded-full w-20 h-20"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="space">
                      <p className="text-xs text-gray-500">{data.text}</p>
                      <h1
                        className="text-xl font-bold
                    text-black/80 dark:text-light"
                      >
                        {data.name}
                      </h1>
                    </div>
                  </div>
                  <p
                    className="text-black/20 text-9xl
                  font-serif absolute top-0 right-0"
                  >
                    ,,
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
