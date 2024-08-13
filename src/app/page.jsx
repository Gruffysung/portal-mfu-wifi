"use client";
import React, { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

function Content() {
  const searchParams = useSearchParams();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const macAddress = searchParams.get("mac");
    const mac = macAddress;
    localStorage.setItem("mac", mac);
    console.log(mac);

    // Delay showing the popup for a better user experience
    setTimeout(() => {
      setShowPopup(true);
    }, 1000); // 1 second delay
  }, [searchParams]);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div
      id="bg-home"
      className="min-h-screen flex flex-col bg-cover bg-center relative"
    >
      <div className="relative py-4 lg:py-0 flex flex-col justify-center my-8 md:my-16 mx-4 md:mx-16 lg:mx-36 xl:mx-56 rounded-lg shadow-xl bg-white bg-opacity-90">
        <div className="relative w-full flex justify-center">
          <div className="relative w-1/4 mt-8 max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
            <Image
              className="object-cover"
              src="/logo-mfu.png"
              layout="responsive"
              width={100}
              height={100}
              alt="Mae Fah Luang University"
              priority
            />
          </div>
        </div>
        <div className="container w-full flex justify-center">
          <div className="relative text-center p-4 md:p-6 lg:p-8">
            <h1 className="font-bold text-lg md:text-xl lg:text-2xl">
              Mae Fah Luang University
            </h1>
            <div className="h-[1.5px] w-full bg-black my-4 mx-auto" />
            <p className="text-sm md:text-base lg:text-xl">
              ระบบยืนยันตัวตนเพื่อเชื่อมต่ออินเทอร์เน็ตผ่าน Application ThaID
            </p>
            <a href="/login">
              <div className="p-3 mt-4 mx-4 mb-10 md:mx-6 lg:mx-8 bg-black text-white text-center rounded-lg">
                <p className="text-sm md:text-base lg:text-xl">เข้าสู่ระบบ</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Pop-up component */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
            <h2 className="text-lg font-bold mb-4">การใช้งานเต็มรูปแบบ</h2>
            <p className="mb-4">
              เพื่อให้สามารถใช้งานเว็บไซต์ได้อย่างสมบูรณ์
              เราแนะนำให้คุณเปิดลิงก์นี้ในเบราว์เซอร์หลักของคุณ:
            </p>
            <ul className="text-left list-disc list-inside mb-4">
              <li>สำหรับ iOS: คลิกปุ่มด้านล่างเพื่อเปิดใน Safari.</li>
              <li>สำหรับ Android: คลิกปุ่มด้านล่างเพื่อเปิดใน Chrome.</li>
            </ul>
            <a
              href="https://mfuthd.mfu.ac.th/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-black text-white rounded-lg"
            >
              เปิดในเบราว์เซอร์หลัก
            </a>
            <button
              onClick={closePopup}
              className="mt-4 p-2 text-sm text-gray-600 underline"
            >
              ปิด
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  );
}
