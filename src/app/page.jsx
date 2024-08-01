
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
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Molestias at libero velit nihil dolore nam, neque iste facilis
              atque ab doloribus numquam odit blanditiis, fuga, debitis qui
              consectetur repellat. Numquam eaque quasi in modi voluptates ab
              facilis tenetur voluptatem nostrum. Modi dolore, est ipsa totam
              tempore minus eius, eaque cumque eum illo possimus ipsum eos
              quibusdam autem laborum tempora nam facere quis nesciunt
              reiciendis, quidem adipisci distinctio. Illum dolorem itaque
              suscipit deserunt vel dignissimos vero rerum maxime ut facilis.
              Numquam!
            </p>
            <div className="container w-10 flex items-center mx-auto justify-center">
              <Link
                className="text-center text-2xl font-bold  text-blue-400 hover:underline pt-2 mt-2 "
                href={"/login"}
              >
                OK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
