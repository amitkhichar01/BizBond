import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col justify-start items-start h-screen">
           <Navbar/>
            <div className="flex justify-center items-center h-full w-full">
                <Link href={"/login"} className="underline cursor-pointer font-montserrat tracking-wider text-2xl hover:text-blue-500">
                    Login Page
                </Link>
            </div>
        </div>
    );
}
