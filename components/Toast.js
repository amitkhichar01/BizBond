import React from "react";
import Image from "next/image";

const Toast = ({ message }) => {
    return (
        <>
            <div className="flex items-center">
                <div className="w-10">
                    <Image src="/error.gif" alt="Error Image" />
                </div>
                <div className="text-lg font-semibold font-montserrat text-red-600 ml-3">{message}</div>
            </div>
            <button type="button" className="rounded-md p-1.5 hover:bg-gray-800 inline-flex items-center justify-center h-8 w-8">
                <span className="sr-only">Close</span>
                <svg className="w-4 h-4 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 12 12m0-12-12 12" />
                </svg>
            </button>
        </>
    );
};

export default Toast;
