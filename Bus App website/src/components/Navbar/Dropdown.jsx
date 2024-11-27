import React from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ links, toggle }) => (
  <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg w-48">
    <ul className="py-2">
      {links.map((link) => (
        <li key={link.id}>
          <Link
            to={link.link}
            onClick={toggle}
            className="block px-4 py-2 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Dropdown;
