"use client";
import React from "react";
import Navbar from "../components/Navebar";
import Image from "next/image";
import { thaid_setdata } from "../../../lib/thaid";

function LoginPage() {
  const { scopeText, state } = thaid_setdata();

  async function handleLogin() {
    const response = await fetch(
      `/api/login?scope=${scopeText}&state=${state}`
    );
    const data = await response.json();

    if (response.ok) {
      window.location.href = data.authUrl; // เปลี่ยนเส้นทางไปยัง URL ที่ได้รับ
    } else {
      console.error("เกิดข้อผิดพลาดในการเปลี่ยนเส้นทาง");
      // console.log(data.authUrl);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <Navbar />
      <div className="flex-grow flex-col items-start justify-center bg-white rounded m-4">
        <div className="h-[0.1rem] w-full bg-gray-200 justify-center mt-12"></div>
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center my-2">
          <div className="mt-2 container px-2">
            <Image
              className="rounded w-full h-auto"
              src="/ThaID_info_1.png"
              layout="responsive"
              width={100}
              height={100}
              alt="Thaid_info"
              priority
            />
          </div>

          <div className="flex items-start justify-center xl:justify-start container mt-2 px-2">
            <a
              className="block text-center cursor-pointer px-3 py-2 xl:ml-4 md:p-6 rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 transition duration-200 w-full max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-xl"
              onClick={handleLogin}
            >
              <div>
                <div className="flex items-center justify-center mt-4">
                  <div className="bg-white rounded-lg mb-3 p-1 ">
                    <Image
                      className="lg:max-w-20"
                      src="/ThaID1.png"
                      width={100}
                      height={100}
                      alt="Thaid-LOGO"
                      priority
                    />
                  </div>
                  <div className="text-center p-1 mb-3">
                    <h1 className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-xl">
                      LOGIN BY THAID
                    </h1>
                  </div>
                </div>
                <div className="h-[0.1rem] w-full bg-white justify-center"></div>
              </div>
              <h2 className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-xl my-3">
                เข้าสู่ระบบคลิกที่นี่
              </h2>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
