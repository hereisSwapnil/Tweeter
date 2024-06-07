import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MdHome,
  MdSearch,
  MdNotifications,
  MdPerson,
  MdMenu,
  MdClose,
} from "react-icons/md";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="lg:hidden">
      <button onClick={toggleMenu} className="p-2">
        {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 flex flex-col items-start p-5 z-10">
          <Link
            to="/"
            className="flex items-center gap-3 text-lg font-semibold hover:text-blue-500 mb-4"
            onClick={toggleMenu}
          >
            <MdHome size={24} />
            Home
          </Link>
          <Link
            to="/search"
            className="flex items-center gap-3 text-lg font-semibold hover:text-blue-500 mb-4"
            onClick={toggleMenu}
          >
            <MdSearch size={24} />
            Search
          </Link>
          <Link
            to="/notifications"
            className="flex items-center gap-3 text-lg font-semibold hover:text-blue-500 mb-4"
            onClick={toggleMenu}
          >
            <MdNotifications size={24} />
            Notifications
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-3 text-lg font-semibold hover:text-blue-500"
            onClick={toggleMenu}
          >
            <MdPerson size={24} />
            Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
