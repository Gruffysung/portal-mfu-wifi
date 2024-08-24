"use client";
import React, { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function Content() {
  const searchParams = useSearchParams();
  const [showPopup, setShowPopup] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [os, setOs] = useState("Unknown OS");

  useEffect(() => {
    //======================= Start get macAddress and decodedMac ==================================
    const macAddress = searchParams.get("mac"); // search macAddress from url
    const decodedMac = decodeURIComponent(macAddress); // decodedMac
    const macCiscoFormat = decodedMac.replace(/:/g, ""); // set form macAddress
    localStorage.setItem("mac", macCiscoFormat); // store macAddress cicso form
    //======================= End get macAddress and decoddeMac ====================================

    //======================= Start get fullUrl ====================================
    const fullUrl = window.location.href; // get fullUrl
    setCurrentUrl(fullUrl); // set url
    //======================= End get fullUrl ====================================

    //======================= Start detect type of browser and Os ====================================
    const userAgent =
      typeof window !== "undefined" ? navigator.userAgent.toLowerCase() : ""; //use navigator.userAgent to detect device type.
    const isWebView = /(FBAN|FBAV|Instagram|WebView|wv)/i.test(userAgent);
    const isSystemBrowser = !isWebView;
    const android = userAgent.includes("android");
    const iphone =
      !android && (userAgent.includes("iphone") || userAgent.includes("ipod"));
    const ipad = !android && !iphone && userAgent.includes("ipad");
    const ios = iphone || ipad;
    const mobile = android || ios;

    //================= start check and set os type =================
    if (/windows/i.test(userAgent)) {
      setOs("Windows");
    } else if (ios) {
      setOs("iOS");
    } else if (android) {
      setOs("Android");
    }
    //================= end check and set os type =================

    //================= start check device type and setShowPopup ===================
    if (mobile) {
      setDeviceType("mobile");
      if (isWebView) {
        setShowPopup(true);
      } else if (isSystemBrowser) {
        setShowPopup(false);
      }
    } else {
      setDeviceType("desktop");
      setShowPopup(false);
    }
    //================= start check device type and setShowPopup ===================

    //======================= End detect type of browser and Os ====================================
  }, [searchParams]);

  //========== start set btn closePopup =============
  const closePopup = () => {
    setShowPopup(false);
  };
  //========== end set btn closePopup =============

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
              width={500}
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
            <p>Your device type is: {deviceType}</p>
            <p>Your Os type is: {os}</p>

            <a href="/login">
              <div className="p-3 mt-4 mx-4 mb-10 md:mx-6 lg:mx-8 bg-black text-white text-center rounded-lg">
                <p className="text-sm md:text-base lg:text-xl">เข้าสู่ระบบ</p>
              </div>
            </a>
          </div>
        </div>
      </div>
      {/* ================================ start Popup ======================================= */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
            <h2 className="text-lg font-bold mb-4">การใช้งานเต็มรูปแบบ</h2>
            <p className="mb-4">
              เพื่อให้สามารถใช้งานเว็บไซต์ได้อย่างสมบูรณ์
              เราแนะนำให้คุณเปิดลิงก์นี้ในเบราว์เซอร์หลักของคุณ:
            </p>
            {/* ================= start check and change messages according to Os system */}
            <div className="text-center list-disc list-inside mb-4">
              {os === "iOS" ? (
                <li>คลิกปุ่มด้านล่างเพื่อเปิดใน Safari.</li>
              ) : os === "Android" ? (
                <li>สำหรับ Android: คลิกปุ่มด้านล่างเพื่อเปิดใน Chrome.</li>
              ) : (
                <li>ระบบปฏิบัติการไม่รู้จัก</li>
              )}
            </div>
            {/* ================= end check and change messages according to Os system */}

            {/* ================= start check and change button messages according to Os system */}
            <div className="">
              {os === "iOS" ? (
                <a
                  onClick={() => window.open(currentUrl, "_system")}
                  className="p-3 bg-black text-white rounded-lg cursor-pointer"
                >
                  Open in Safari
                </a>
              ) : (
                <a
                  onClick={() => window.open(currentUrl, "_system")}
                  className="p-3 bg-black text-white rounded-lg cursor-pointer"
                >
                  Open in Chrome
                </a>
              )}

              <button
                onClick={closePopup}
                className="mt-4 p-2 text-sm text-gray-600 underline"
              >
                ปิด
              </button>
            </div>
            {/* ================= end check and change button messages according to Os system */}
          </div>
        </div>
      )}
      {/* ================================ end Popup ======================================= */}
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
