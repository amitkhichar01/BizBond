"use client";
import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
    const { data: session, status } = useSession();
    const handleSignOut = () => {
        signOut();
        alert("Successfully Sign out");
    };

    return (
        <div className={`flex items-center justify-between sm:justify-between  p-2 lg:pl-40 w-full`}>
            <Link href={"/"} className="font-playfair text-xl lg:text-3xl tracking-wide">
                Biz<span className="text-green-500">Bond</span>
            </Link>
            {session && (
                <button
                    onClick={() => handleSignOut()}
                    className="flex text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-sm text-sm px-5 py-2.5 text-center lg:mr-40"
                >
                    <span className="text-gray-200 sm:pr-4">LogOut</span> <span className="text-gray-700 hidden sm:inline-flex">&#40;{session.user.email}&#41;</span>
                </button>
            )}
        </div>
    );
};

export default Navbar;
