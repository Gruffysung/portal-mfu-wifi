"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { ClipLoader } from "react-spinners";

export default function WelcomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [code, setCode] = useState(null);
  const [tokenData, setTokenData] = useState(null);
  const [error, setError] = useState(null);
  const [expiresIn, setExpiresIn] = useState(null);
  const isFetching = useRef(false); // ใช้ useRef เพื่อจัดการสถานะการเรียก API

  useEffect(() => {
    if (isFetching.current) return; // ป้องกันการเรียก API หลายครั้ง

    const code = searchParams.get("code");
    window.history.replaceState(null, "", "/process");

    if (!code) {
      router.push("/login");
      return;
    }

    setCode(code);
    isFetching.current = true;

    fetch("/api/callback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setTokenData(data);
          const expirationDate = new Date(
            data.expires_in * 1000
          ).toLocaleString();
          setExpiresIn(expirationDate);
        }
        isFetching.current = false;
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        setError("Failed to fetch token");
        isFetching.current = false;
      });
  }, [searchParams, router]);

  return (
    <div className="h-auto w-full text-center">
      <div>
        {tokenData ? (
          <div>
            <p>
              <strong>Connection completed</strong>
            </p>
            <p>
              <strong>ระบบจะตัดการเชื่อต่อจาก WIFI หลังจาก 24 ชั่วโมง</strong>
            </p>
          </div>
        ) : (
          <div>
            <ClipLoader size={50} color={"#123abc"} loading={true} />
          </div>
        )}
      </div>
    </div>
  );
}
