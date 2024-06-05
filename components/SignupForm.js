import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { signIn } from "next-auth/react";
import Loader from "./Loader";
import { hashPassword } from "@/lib/auth";
import Toast from "./Toast";

const SignupForm = ({ formRef, setIsVisible, isVisible }) => {
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            let { email, password } = data;

            // Trim email and password
            email = email.trim();
            password = password.trim();

            // Hash password
            const hashedPassword = await hashPassword(password);

            // Call the signup API
            const response = await axios.post("/api/signup", {
                ...data,
                password: hashedPassword,
            });

            // Sign in after successful signup
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });
            setIsVisible(!isVisible);
        } catch (error) {
            console.error("Error during sign up:", error);
            if (error.response?.data?.message.includes("Email")) {
                setError("email", {
                    type: "manual",
                    message: error.response?.data?.message,
                });
            } else {
                setMessage(error.response?.data?.message || "An error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (message) {
        setTimeout(() => {
            setMessage(null);
        }, 7000);
    }

    return (
        <div ref={formRef} className=" bg-[--bg-SlateGray-color]  p-3 md:p-20 flex justify-center items-center fixed top-0 left-0 w-full h-full tracking-wider">
            <div className="bg-black rounded-lg border-2 border-blue-500 p-5 md:p-20 relative ">
                {isLoading && <Loader />}

                <svg
                    onClick={() => setIsVisible(!isVisible)}
                    className="w-6 h-6 text-gray-800 dark:text-white absolute top-2 right-2 md:right-4 md:top-4 cursor-pointer"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                </svg>

                <h4 className="text-center  pt-5 pb-5 md:pb-10 text-lg text-green-500">Create New Account</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-8">
                        <label htmlFor="name" className="block text-base font-medium text-gray-200">
                            Name
                        </label>
                        <input
                            type="name"
                            id="name"
                            className={`mt-1 block w-full px-3 py-2 border border-gray-400 ${
                                errors.name ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                            } rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-base bg-black text-white`}
                            {...register("name", {
                                required: "name is required",
                            })}
                        />
                        {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                    </div>

                    <div className="mb-8">
                        <label htmlFor="email" className="block text-base font-medium text-gray-200">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className={`mt-1 block w-full px-3 py-2 border border-gray-400 ${
                                errors.email ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                            } rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-base bg-black text-white`}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                    </div>

                    <div className="mb-8">
                        <label htmlFor="password" className="block text-base font-medium text-gray-200">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className={`mt-1 block w-full px-3 py-2 border border-gray-400 ${
                                errors.password ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                            } rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-base bg-black text-white`}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters",
                                },
                            })}
                        />
                        {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                    </div>

                    <button type="submit" className="w-full  bg-blue-600 text-white py-2 px-4 rounded-sm hover:bg-blue-700 focus:outline-none">
                        SignUp
                    </button>
                </form>
            </div>
            {message && (
                <div
                    onClick={() => {
                        setMessage(null);
                    }}
                    className="flex items-center justify-between w-full max-w-xs p-2 sm:p-4 fixed top-1 sm:top-4 sm:right-4 cursor-pointer rounded-lg bg-black"
                >
                    <Toast message={message} />
                </div>
            )}
        </div>
    );
};

export default SignupForm;
