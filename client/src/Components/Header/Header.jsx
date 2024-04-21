import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoMdMenu } from "react-icons/io";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { useSelector } from "react-redux";
import { BsPersonCircle } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { MdDashboardCustomize } from "react-icons/md";
import { GoPackage } from "react-icons/go";

import { BsPencil } from "react-icons/bs";
import { signOutSuccess } from "../../Redux/User-Slice/userSlice";
import {
  updateFail,
  updateSuccess,
  clearError,
} from "../../Redux/User-Slice/userSlice";
import { useDispatch } from "react-redux";
import { current } from "@reduxjs/toolkit";

const menuItems = [
  {
    name: "Home",
    href: "/",
  },

  {
    name: "About",
    href: "/about",
  },
  {
    name: "Menu",
    href: "/menu",
  },
  {
    name: "Order ",
    href: "/order",
  },
  {
    name: "Reservations",
    href: "/reservations",
  },

  {
    name: "Contact Us",
    href: "/contact",
  },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [showDropdown, setShowDropdown] = React.useState(false);

  const [error, setError] = useState(" ");

  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const refreshToken = currentUser?.message?.refreshToken || null;
      const refreshRes = await fetch(`/api/auth/refreshToken/${refreshToken}`, {
        method: "POST",
        credentials: "include",
      });

      const dataRefresh = await refreshRes.json();
      if (!refreshRes.ok) {
        const data = await refreshRes.json();
        dispatch(updateFail(data.error));

        setTimeout(() => {
          dispatch(clearError());
        }, 4000);
        return;
      }

      dispatch(updateSuccess(dataRefresh));
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(signOutSuccess());
        window.location.href = "/";
      } else {
        setError(error.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="relative bg-zinc-50 w-full ">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2 ">
          <Link
            to="/"
            className={`whitespace-nowrap self-center font-logo_font text-black text-sm sm:text-xl font-semibold`}
          >
            <span className="px-2 py-1 font-logo_font   text-[#E52A3D] rounded-lg">
              NOVA
            </span>
            NOSH
          </Link>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-base font-logo_font font-thin  text-gray-800 hover:text-[#E52A3D] hover:border-b-2 hover:border-[#E52A3D] py-2 transition duration-300 ease-in-out"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden  lg:flex lg:items-center lg:justify-end">
          <div className="hidden lg:block rounded-full p-3">
            <HiOutlineShoppingCart className="h-6 w-6 cursor-pointer" />
          </div>

          {/* Sign In ................................ */}
          <div className="mt-4 lg:mt-0 lg:ml-4 flex items-center justify-end">
            {currentUser ? (
              <div className="relative inline-block">
                <button
                  type="button"
                  className="focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-gray-400 rounded-full hover:bg-gray-100 p-2"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {currentUser.message.user.image ? (
                    <img
                      src={currentUser.message.user.image}
                      alt="User Cover Image"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <BsPersonCircle className="h-10 w-10 text-gray-400 rounded-full" />
                  )}
                </button>

                {showDropdown && (
                  <div
                    className="absolute top-full right-0 z-50 bg-white shadow-md rounded-md w-auto overflow-hidden transition-all duration-200 ease-in-out transform translate-y-1 "
                    style={{
                      opacity: showDropdown ? 1 : 0,
                      pointerEvents: showDropdown ? "auto" : "none",
                    }}
                  >
                    <div className="p-4 flex flex-col items-center">
                      <div className="space-y-2">
                        {currentUser.message.user.isAdmin ? (
                          <Link
                            to="/dashboard?tab=dashboards"
                            className="text-gray-800 hover:text-gray-600 p-2 flex items-center space-x-2"
                          >
                            <MdDashboardCustomize className="text-xl" />
                            <span className="whitespace-nowrap">Dashboard</span>
                          </Link>
                        ) : (
                          <Link
                            to="/account?pro=profile"
                            className="text-gray-800 hover:text-gray-600 p-2 flex items-center space-x-2"
                          >
                            <IoPersonOutline className="text-xl mx-3" />
                            Profile
                          </Link>
                        )}

                        {currentUser.message.user.isAdmin ? null : (
                          <Link
                            to="/order"
                            className="text-gray-800 hover:text-gray-600 p-2 flex items-center space-x-2"
                          >
                            <GoPackage className="text-xl mx-3" />
                            Orders
                          </Link>
                        )}

                        <button
                          type="button"
                          onClick={handleLogout}
                          className="text-red-500 hover:text-red-700 p-2 flex items-center space-x-2"
                        >
                          <IoIosLogOut className="text-2xl mx-3" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/signIn">
                <button
                  type="button"
                  className="rounded-md px-4 py-2 bg-[#E52A3D] text-white hover:bg-black hover shadow-lg focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-white font-semibold text-sm"
                >
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden">
          <IoMdMenu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden justify-end">
            <div className="bg-black opacity-25 fixed inset-0"></div>
            <div className="relative flex flex-col w-64 bg-white">
              <div className="flex items-center justify-between p-4 bg-gray-100">
                {/* Logo */}

                {currentUser ? (
                  <Link to={"/account?pro=profile"}>
                    <div className="flex gap-4 items-center ">
                      {currentUser.message.user.image ? (
                        <img
                          src={currentUser.message.user.image}
                          alt="User Cover Image"
                          className="w-7 h-7 rounded-full object-cover"
                        />
                      ) : (
                        <BsPersonCircle className="h-6 w-6 text-gray-400 rounded-full" />
                      )}
                      <div>
                        <span className="block text-sm  font-semibold text-gray-800">
                          {currentUser.message.user.firstName}{" "}
                          {currentUser.message.user.lastName}
                        </span>
                        <span className="block text-xs text-gray-600">
                          {currentUser.message.user.email}
                        </span>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <Link
                    to="/"
                    className={`whitespace-nowrap self-center font-logo_font text-black text-sm sm:text-xl font-semibold`}
                  >
                    <span className="px-2 py-1 font-logo_font   text-[#E52A3D] rounded-lg">
                      NOVA
                    </span>
                    NOSH
                  </Link>
                )}

                <button
                  type="button"
                  onClick={toggleMenu}
                  className="text-black hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  <span className="sr-only">Close menu</span>
                  <MdOutlineRestaurantMenu
                    className="h-6 w-6"
                    aria-hidden="true"
                  />
                </button>
              </div>
              <nav className="flex-1 p-4 overflow-y-auto">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    {item.name}
                  </Link>
                ))}
                {currentUser ? (
                  <>
                    <Link
                      key="wishlist"
                      to="/account?pro=wishlist"
                      className="block py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                    >
                      Wishlist
                    </Link>
                    <Link
                      key="address"
                      to="/account?pro=address"
                      className="block py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                    >
                      My Address
                    </Link>
                  </>
                ) : null}
              </nav>

              {/* Sign in button */}
              <div>
                {currentUser ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="p-4 mt-auto w-full text-sm font-semibold text-white bg-[#E52A3D]  hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Logout
                  </button>
                ) : (
                  <Link to={`/signIn`}>
                    <button
                      type="button"
                      className="p-4 mt-auto w-full text-sm font-semibold text-white bg-[#E52A3D]  hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      Sign-In
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
