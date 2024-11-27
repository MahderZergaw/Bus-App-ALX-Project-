import React from "react";
import footerLogo from "../../assets/Logo.png";
import Banner from "../../assets/FooterImage.jpg";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

const TermsLinks = [
  {
    title: "Terms and Conditions",
    link: "/#",
  },
  {
    title: "Privacy Policy",
    link: "/#about",
  },
];

const FooterLinks = [
  {
    title: "Home",
    link: "/#",
  },
  {
    title: "About",
    link: "/#about",
  },
  {
    title: "Contact",
    link: "/#contact",
  },
  {
    title: "Services",
    link: "/#services",
  },
];

const Footer = () => {
  return (
    <div style={BannerImg} className="text-white mb-20">
      <div className="container">
        <div data-aos="zoom-in" className="grid md:grid-cols-3 pb-44 pt-5">
          {/* company details */}
          <div className="py-8 px-4">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
              <img
                src={footerLogo}
                alt=""
                className="max-w-[50px] rounded-full"
              />
              ADDIS RIDE
            </h1>
            <p>Catch the Savings, Ride the Bus!</p>
          </div>
          {/* Footer Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
            <div>
              <div className="py-8 px-4">
                <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3">
                  Company
                </h1>
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((link) => (
                    <li
                      className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                      key={link.title}
                    >
                      <a href={link.link}>{link.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div className="py-8 px-4">
                <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3">
                  Terms
                </h1>
                <ul className="flex flex-col gap-3">
                  {TermsLinks.map((link) => (
                    <li
                      className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                      key={link.title}
                    >
                      <a href={link.link}>{link.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* social links */}
            <div>
              <div className="flex items-center gap-3 mt-2">
                <div className="py-6 px-4">
                  <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3">
                    Connect With Us
                  </h1>
                  <a href="#" className="inline-block mr-2">
                    <FaInstagram className="text-3xl" />
                  </a>
                  <a href="#" className="inline-block mr-2">
                    <FaFacebook className="text-3xl" />
                  </a>
                  <a href="#" className="inline-block mr-2">
                    <FaLinkedin className="text-3xl" />
                  </a>
                  <div className="mt-2">
                    <div className="flex items-center gap-3">
                      <FaLocationArrow />
                      <p>Shell, ALX_Africa</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaMobileAlt />
                      <p>+234...........</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
