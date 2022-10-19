/* eslint-disable @next/next/no-img-element */
import React from "react";

function Header() {
  return (
    <header>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          alt="logo"
          src="/Netflix_2015_logo.svg"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
