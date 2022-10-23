/* eslint-disable @next/next/no-img-element */
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <div className="cursor-pointer object-contain translate-y-1">
          <Image
            alt="logo"
            src="/Netflix_2015_logo.svg"
            width={100}
            height={30}
            className="object-contain"
          />
        </div>
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <MagnifyingGlassIcon className="hidden sm:inline h-6 w-6" />
        <p className="hidden lg:inline">kids</p>
        <BellIcon className="h-6 w-6" />
        <div className=" relative w-[32px] h-[32px]">
          <Image
            onClick={logout}
            alt="account"
            layout="fill"
            src="/user-profile.png"
            className="rounded cursor-pointer"
          ></Image>
        </div>
      </div>
    </header>
  );
}

export default Header;
