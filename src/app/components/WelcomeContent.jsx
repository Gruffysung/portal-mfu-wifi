"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { ClipLoader } from "react-spinners";

export default function WelcomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [code, setCode] = useState(null);
  const [mac, setMac] = useState(null);
  const [tokenData, setTokenData] = useState(null);
  const [error, setError] = useState(null);
  const [clearPassResult, setClearPassResult] = useState(null);
  const isFetching = useRef(false);

  useEffect(() => {
    const macAddress = localStorage.getItem("mac");
    setMac(macAddress);

    if (isFetching.current) return;

    const code = searchParams.get("code");
    window.history.replaceState(null, "", "/welcome");

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
          throw new Error(data.error);
        } else {
          setTokenData(data);
          return fetch("/api/endpoint_clearpass", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ mac: macAddress }),
          });
        }
      })
      .then((response) => response.json())
      .then((clearPassData) => {
        if (clearPassData.error) {
          setError(clearPassData.error);
          throw new Error(clearPassData.error);
        } else {
          setClearPassResult(clearPassData);
        }
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        setError("Failed to fetch token or clear pass authentication");
        router.push("/login");
      })
      .finally(() => {
        isFetching.current = false;
      });
  }, [searchParams, router]);

  return (
    <div className="h-auto w-full text-center">
      <div>
        {clearPassResult && clearPassResult.status === "pending" ? (
          <div>
            <p className="text-lg font-bold">
              <strong>Connection completed</strong>
            </p>
            <p className="mt-4">
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
