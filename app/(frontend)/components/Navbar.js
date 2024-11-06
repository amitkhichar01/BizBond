"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Search from "./Search";
import Image from "next/image";
import { applyImageTransformation } from "@/utils/imageUtils";

const Navbar = () => {
    const { data: session, status } = useSession();
    const [isVisible, setIsVisible] = useState(false);
    const dropDownRef = useRef(null);

    let userId;
    if (session) {
        userId = session.user.id;
    }
    const handleSignOut = () => {
        const userConfirmed = window.confirm("Are you sure you want to sign out?");
        if (userConfirmed) {
            signOut({ callbackUrl: "/", redirect: true });
        } else {
            console.log("Sign-out cancelled");
        }
    };

    const handleClickOutside = (event) => {
        if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        if (isVisible) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isVisible]);

    return (
        <nav className="bg-white border-b-2  border-b-gray-200  w-[100vw] font-nunito fixed top-0 z-30 ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2">
                <div className="flex gap-5 items-center">
                    <Link href={"/"} className="font-bold text-xl lg:text-3xl tracking-wide">
                        Biz<span className="text-blue-500">Bond</span>
                    </Link>
                    <div className="hidden sm:inline">
                        <Search />
                    </div>
                </div>

                <div className="flex justify-evenly items-center flex-1">
                    <Link href="/" className="animated_underline relative flex flex-col justify-between items-center">
                        <span className="w-5 ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                            </svg>
                        </span>
                        <p className="hidden sm:inline ">Home</p>
                    </Link>

                    <Link href={userId ? `/mynetwork/${userId}?section=followers` : "/login"} className="animated_underline relative flex flex-col justify-center items-center">
                        <span className="w-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z" />
                            </svg>
                        </span>
                        <p className="hidden sm:inline "> My Network</p>
                    </Link>

                    <p className="relative hidden sm:flex flex-col justify-center items-center">
                        <span className="w-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64h96v80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64z" />
                            </svg>
                        </span>
                        <span className="blur-[1px]"> Messaging</span>
                    </p>
                </div>

                <div ref={dropDownRef} className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
                    {session && session.user ? (
                        <button
                            onClick={() => setIsVisible(!isVisible)}
                            type="button"
                            id="user-menu-button"
                            aria-expanded="false"
                            data-dropdown-toggle="user-dropdown"
                            data-dropdown-placement="bottom"
                        >
                            <div className="flex  items-center gap-1">
                                {session.user.profile_url ? (
                                    <Image
                                        src={applyImageTransformation(session.user.profile_url, "w_400,h_400,c_thumb,g_face")}
                                        width={100}
                                        height={100}
                                        alt="User Image"
                                        className="rounded w-9 h-9"
                                        priority
                                    />
                                ) : (
                                    <svg className="w-10 h-10 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            fillRule="evenodd"
                                            d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}

                                <svg className="w-4 h-4 self-end text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                                </svg>
                            </div>
                        </button>
                    ) : (
                        <Link href={"/login"} className="animated_underline font-semibold text-transparent bg-clip-text bg-gradient-to-r to-blue-600 from-blue-950">
                            SignIn
                        </Link>
                    )}
                    {/* Dropdown menu */}
                    {session && session.user && (
                        <div
                            className={` ${
                                isVisible ? "block" : "hidden"
                            } w-max my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-md shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-7 -right-5 `}
                            id="user-dropdown"
                        >
                            <div className="px-4 py-3">
                                <h3 className="block text-lg text-gray-900 dark:text-white">{session.user.name}</h3>

                                <h5 className="text-sm  text-gray-500 truncate dark:text-gray-400">{session.user.email}</h5>
                            </div>
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <Link href={`/user/${userId}`} className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                        My Profile
                                    </Link>
                                </li>

                                <li>
                                    <p
                                        onClick={() => handleSignOut()}
                                        className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    >
                                        Sign out
                                    </p>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
