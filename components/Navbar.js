import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

export default function Navbar({ category, setCategory, setPage }) {
  const [nav, setNav] = useState(false);
  const links = [
    "technology",
    "business",
    "science",
    "sports",
    "entertainment",
    "health",
  ];
  return (
    <nav className="flex justify-between bg-white shadow-sm items-center w-full h-16 px-5 md:px-10 fixed">
      <h1 className="text-2xl sm:text-3xl z-20 font-bold text-gray-700 font-signature cursor-pointer">
        <span className="text-blue-500">TAJA</span> KHABAR
      </h1>
      <ul className="hidden lg:flex">
        {links.map((link, index) => {
          return (
            <li
              key={index}
              className={`px-4 capitalize cursor-pointer ${
                category === link ? "text-blue-500" : "text-gray-700"
              } font-medium hover:text-blue-500 hover:scale-105 duration-100`}
              onClick={() => {
                setCategory(link);
                setPage(1);
              }}
            >
              {link}
            </li>
          );
        })}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer z-20 text-gray-700 lg:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="z-10 flex lg:hidden flex-col items-center w-full  py-24 absolute top-0 left-0 bg-slate-50 h-screen">
          {links.map((link, index) => {
            return (
              <li
                key={index}
                className={`px-4 capitalize cursor-pointer ${
                  category === link ? "text-blue-500" : "text-gray-700"
                } font-medium hover:text-blue-500 hover:scale-105 duration-100 my-2`}
                onClick={() => {
                  setCategory(link);
                  setPage(1);
                }}
              >
                {link}
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
