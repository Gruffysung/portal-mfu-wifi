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
    const macAddress = localStorage.getItem("mac"); // get macAddress from localStroage.
    setMac(macAddress);

    if (isFetching.current) return;

    const code = searchParams.get("code"); // search code from url the url sent from the api/callback.

    window.history.replaceState(null, "", "/welcome"); //restet url to anonymize information.

    if (!code) {
      router.push("/login"); // if not found code from url redirect to page login
      return;
    }
    setCode(code);

    isFetching.current = true;

    fetch("/api/callback", {
      // call api/callback.
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }), // sent code to api/callback.
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          throw new Error(data.error);
        } else {
          setTokenData(data); // set data from respone api/callback.

          return fetch("/api/endpoint_clearpass", {
            // call api/enpoint_clearpass.
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ mac: macAddress }), // sent macAddress to api/enpoint_clearpass.
          });
        }
      })
      .then((response) => response.json())
      .then((clearPassData) => {
        if (clearPassData.error) {
          setError(clearPassData.error); // set error from respone api/enpoint_clearpass.
          throw new Error(clearPassData.error);
        } else {
          setClearPassResult(clearPassData); // set data from respone api/enpoint_clearpass.
        }
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        setError("Failed to fetch token or clear pass authentication");
        router.push("/login"); // if api/enpoint_clearpass unsuccessful redirect to login page.
      })
      .finally(() => {
        isFetching.current = false;
      });
  }, [searchParams, router]);

  return (
    <div className="h-auto w-full text-center">
      <div>
        {/* start wait and check respone from api/enpoint_clearpass  */}
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
        {/* end wait and check respone from api/enpoint_clearpass  */}
      </div>
    </div>
  );
}
