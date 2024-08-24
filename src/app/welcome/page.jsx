"use client";
import { Suspense } from "react";
import { ClipLoader } from "react-spinners";
import Navbar from "../components/Navebar";
import WelcomeContent from "../components/WelcomeContent";

export default function Welcome() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-white p-4 md:p-8 m-4 rounded-lg shadow-md">
        <div className="relative w-full max-w-md mx-auto p-4 bg-white rounded-md shadow-xl shadow-gray-300">
          <h1 className="font-bold text-center text-xl mb-4 md:text-2xl lg:text-3xl">
            Mae Fah Luang University
          </h1>
          <Suspense>
            <WelcomeContent /> {/* use WelcomeContent from componentes */}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
