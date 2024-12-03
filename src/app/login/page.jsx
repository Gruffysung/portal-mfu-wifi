"use client";
import React from "react";
import Navbar from "../components/Navebar";
import Image from "next/image";
import { thaid_setdata } from "../../../lib/thaid";
import DownloadButtons from "../components/DowloadButton";
import { useEffect, useState, useRef } from "react";

function LoginPage() {
  const { scopeText, state } = thaid_setdata();
  const [mac, setMac] = useState(null);

  useEffect(() => {
    // ====================== start get macAddress from localStorage. =====================
    const macAddress = localStorage.getItem("mac");
    setMac(macAddress);
    // ====================== end  get macAddress from localStorage. =====================
  }, []);

  // ====================== start Declare function login =====================
  async function handleLogin() {
    const response = await fetch(
      `/api/login?scope=${scopeText}&state=${state}`
    );
    const data = await response.json();

    if (response.ok) {
      window.location.href = data.authUrl ; // open authUtl from respone from api/login
    } else {
      console.error("เกิดข้อผิดพลาดในการเปลี่ยนเส้นทาง");
    }
  }
  // ====================== end Declare function login =====================

  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <Navbar /> {/* use navbar from componentes */}
      <div className="xl:flex-grow flex-col items-start justify-center bg-white rounded m-4">
        <h1 className="text-black font-bold text-sm md:text-xl lg:text-2xl m-4 mt-6">
          ระบบยืนยันตัวตนเพื่อเชื่อมต่ออินเทอร์เน็ตผ่าน Application ThaID
        </h1>
        <div className="h-[0.1rem] w-full bg-gray-200 justify-center mt-4" />
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

          <div className="flex flex-col items-start justify-center xl:justify-start container mt-2 px-2">
            <div className="flex flex-row items-start justify-center xl:justify-start container mt-2 px-2">
              <a
                id="btn-login"
                className="block text-center cursor-pointer px-3 py-2 xl:ml-4 md:p-6 rounded-full shadow-md border-4 w-full max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-xl"
                onClick={handleLogin}
              >
                <div className="flex items-center justify-center">
                  <div
                    id="logo-thaid"
                    className="bg-white rounded-full p-1 w-24 h-24 flex items-center justify-center"
                  >
                    <Image
                      className="w-full h-full object-cover rounded-full"
                      src="/thaiD_logo.png"
                      width={100}
                      height={100}
                      alt="Thaid-LOGO"
                      priority
                    />
                  </div>
                </div>
                <div
                  id="line"
                  className="h-[0.1rem] w-full bg-white justify-center mt-4 rounded-xl"
                ></div>
                <div
                  id=""
                  className="h-[0.15rem] w-full bg-white justify-center rounded-xl "
                ></div>
                <div
                  id="line"
                  className="h-[0.1rem] w-full bg-white justify-center mb-4 rounded-xl"
                ></div>
                <h1 className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-xl">
                  LOGIN BY THAID
                </h1>
              </a>
            </div>

            <div className="w-full p-6">
              <div className="h-[0.1rem] w-full bg-gray-200 justify-center my-4" />
              <h1 className=" font-bold text-lg sm:text-xl md:text-2xl lg:text-xl">
                สามารถดาวน์โหลดแอปพลิเคชั่น ThaID ได้ที่
              </h1>
              <DownloadButtons /> {/* use DowloadButtons from componentes */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
