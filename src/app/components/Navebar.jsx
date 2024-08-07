"use client";
import React from "react";
import Image from "next/image";
function Navbar() {
  return (
    <div>
      <nav
        id="nav"
        className="text-white p-2 flex "
        style={{ overflow: "hidden" }}
      >
        <div>
          <a href="/">
            <Image
              src="/mfu-logo.png"
              width={60}
              height={60}
              alt="MFU-LOGO"
              priority
            ></Image>
          </a>
        </div>
        <div className="container flex items-center">
          <div className="h-[3.5rem] w-[0.1rem]  ml-2" id="line"></div>
          <div className="flex flex-col items-center ml-2">
            <h1 id="NameUni" className="font-bold">
              Mae Fah Luang University
            </h1>
            <div
              className="h-[0.1rem] w-[14rem] justify-center my-1"
              id="line"
            ></div>
            <h1 id="NameUni" className="font-bold">
              มหาวิทยาลัยแม่ฟ้าหลวง
            </h1>
          </div>
        </div>
      </nav>
      <div className="h-2" id="line-under"></div>
    </div>
  );
}

export default Navbar;
