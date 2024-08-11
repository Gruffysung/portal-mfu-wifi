"use client";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function Main() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const macAddress = searchParams.get("mac");
    const mac = macAddress
    localStorage.setItem('mac',mac)
    console.log(mac);
    

  }, [searchParams, router]);


  return (
    <div
      id="bg-home"
      className="min-h-screen flex flex-col bg-cover bg-center relative"
    >
      <div className="relative py-4 lg:py-0 flex flex-col justify-center my-8 md:my-16 mx-4 md:mx-16 lg:mx-36 xl:mx-56 rounded-lg shadow-xl bg-white bg-opacity-90">
        <div className="relative w-full flex justify-center">
          <div className="relative w-1/4 mt-8  max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
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
              ระบบยืนยันตัวตนเพื่อเชื่อมต่ออินเทอร์เน็ตผ่าน Application ThaID.
            </p>
            <a href="/login">
              <div className="p-3 mt-4 mx-4 mb-10 md:mx-6 lg:mx-8 bg-black text-white text-center rounded-lg">
                <p className="text-sm md:text-base lg:text-xl">เข้าสู่ระบบ</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
