import React from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../constants/routes";

const MobileMenu = ({ toggle }) => (
  <div
    className="sm:hidden fixed inset-0 z-50 bg-gray-900 bg-opacity-50"
    onClick={toggle}
  >
    <div
      className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 p-4"
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={toggle} className="text-xl mb-4">
        Close
      </button>
      <ul className="flex flex-col gap-4">
        {[
          { id: 1, name: "Home", link: ROUTES.home },
          { id: 2, name: "About", link: ROUTES.about },
          { id: 3, name: "Login", link: ROUTES.login },
        ].map((item) => (
          <li key={item.id}>
            <Link
              to={item.link}
              onClick={toggle}
              className="block px-4 py-2 text-black dark:text-white hover:bg-primary/20 rounded-md"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default MobileMenu;
