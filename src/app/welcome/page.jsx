"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Navbar from "../components/Navebar";

export default function Process() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [code, setCode] = useState(null);
  const [tokenData, setTokenData] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [expiresIn, setExpiresIn] = useState(null);

  useEffect(() => {
    const code = searchParams.get("code");
    window.history.replaceState(null, "", "/process");

    if (!code) {
      console.log("No code found, redirecting to login");
      router.push("/login");
      return;
    }

    if (isFetching) {
      console.log("Already fetching, skipping API call");
      return;
    }

    setCode(code);
    setIsFetching(false);

    fetch("/api/callback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("API Response Data:", data);
        if (data.error) {
          setError(data.error);
        } else {
          setTokenData(data);
          const expirationDate = new Date(
            data.expires_in * 1000
          ).toLocaleString();
          setExpiresIn(expirationDate);
        }
        setIsFetching(false);
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        setError("Failed to fetch token");
        setIsFetching(false);
      });
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-white p-4 md:p-8 m-4 rounded-lg shadow-md">
        <div className="relative w-full max-w-md mx-auto p-4 bg-white rounded-md shadow-xl shadow-gray-300">
          <h1 className="font-bold text-center text-xl mb-4 md:text-2xl lg:text-3xl">
            Mae Fha Luang University
          </h1>
          <div className="h-auto w-full text-center">
            <div>
              {tokenData ? (
                <div>
                  <p>
                    <strong>Connection completed</strong>
                  </p>
                  <p>
                    <strong>Expires in:</strong> {expiresIn}
                  </p>
                </div>
              ) : (
                <div>
                  <ClipLoader size={50} color={"#123abc"} loading={true} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
