
import Navbar from "./components/Navebar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md mx-auto p-4">
          <h1 className="text-center text-4xl mb-8 md:text-2xl lg:text-4xl">
            MFU WIFI 
          </h1>
          <div className="h-auto w-full">
            {/* ข้อมูลและรายละเอียดต่างๆที่ผู้ใช้ควรรู้ึ */}
            <p className="text-center text-xl">
              ระบบยืนยันตัวตนเพื่อเชื่อมต่ออินเทอร์เน็ต
            </p>
            <p>
              
            </p>
            <div className="container w-10 flex items-center mx-auto justify-center">
              <Link
                className="text-center text-2xl font-bold  text-blue-400 hover:underline pt-2 mt-2 "
                href={"/login"}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
