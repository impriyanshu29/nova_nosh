'use client'

import React from 'react'
import  {useState} from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoMdMenu } from "react-icons/io";
import { MdOutlineRestaurantMenu } from "react-icons/md";

const menuItems = [
  {
    name: 'Home',
    href: '/',
  },
 

  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Menu',
    href: '/menu',
  },
  {
    name:'Order Online',
    href:'/order'
  },
  {
    name:'Reservations',
    href:'/reservations'
  },
  
  {
    name: 'Contact Us',
    href: '/contact',
  },
]

 function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
  <div className="mt-4 lg:mt-0 lg:ml-4">
    <Link to={`/signIn`} >
    <button
      type="button"
      className="rounded-md bg-[#E52A3D]  px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
    >
      Login
    </button>
    </Link>
  </div>
</div>

        <div className="lg:hidden">
          <IoMdMenu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
  <div className="fixed inset-0 z-50 flex lg:hidden justify-end">
    <div className="bg-black opacity-25 fixed inset-0"></div>
    <div className="relative flex flex-col w-64 bg-white">
      <div className="flex items-center justify-between p-4 bg-gray-100">
      <Link
            to="/"
            className={`whitespace-nowrap self-center font-logo_font text-black text-sm sm:text-xl font-semibold`}
          >
            <span className="px-2 py-1 font-logo_font   text-[#E52A3D] rounded-lg">
              NOVA 
            </span>
             NOSH
          </Link>
        <button
          type="button"
          onClick={toggleMenu}
          className="text-black hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          <span className="sr-only">Close menu</span>
          <MdOutlineRestaurantMenu className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <nav className="flex-1 p-4 overflow-y-auto">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="block py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
          >
            {item.name}
          </a>
        ))}
      </nav>
      <Link to={`/signIn`} >
      <button
        type="button"
        className="p-4 mt-auto w-full text-sm font-semibold text-white bg-[#E52A3D]  hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        Sign-In
      </button>
      </Link>
    </div>
  </div>
)}


      </div>
    </div>
  )
}

export default Header
