import { useState } from "react";

import { token } from "../../constants/auth-constant";

const User = ({ dataUser }) => {
  const [show, setShow] = useState(false);

  const toggleDropup = () => {
    setShow(!show);
  };

  return (
    <div className="relative"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-10 h-10 cursor-pointer"
        onClick={toggleDropup}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      {show && (
        <div className="absolute w-36 bottom-full left-0 mt-2 bg-white border-2 border-gray-300 rounded-3xl">
          <div className="py-1">
            <div className="text-gray-700 block px-4 py-2 text-sm">
              <span>{dataUser?.username}</span>
            </div>
            {/* <button
              className="text-gray-700 block px-4 py-2 text-sm"
              id="menu-item-1"
            >
              Account settings
            </button> */}
            {/* <button class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">License</button> */}
            <form>
              <button
                type="submit"
                className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                id="menu-item-2"
                onClick={() => localStorage.removeItem(token)}
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
