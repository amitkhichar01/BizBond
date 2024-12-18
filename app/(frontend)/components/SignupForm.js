import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { signIn } from "next-auth/react";
import { hashPassword } from "@/app/(backend)/api/middleware/auth";
import Loader from "./Loader";

const SignupForm = ({ formRef, setIsVisible, isVisible }) => {
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
            const response = await axios.post("/api/users/signup", {
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

            // Check if error.response and error.response.data are defined
            if (error.response && error.response.data && error.response.data.message) {
                // Check if the error message contains "Email"
                if (error.response.data.message.includes("Email")) {
                    setError("email", {
                        type: "manual",
                        message: error.response.data.message,
                    });
                } else {
                    // Handle other types of errors here
                    setError("general", {
                        type: "manual",
                        message: error.response.data.message,
                    });
                }
            } else {
                // Handle cases where error.response.data.message is not defined
                setError("general", {
                    type: "manual",
                    message: "An error occurred during sign up.",
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div ref={formRef} className=" bg-[--bg-SlateGray-color]  p-3 md:p-20 flex justify-center items-center fixed top-0 left-0 w-full h-full tracking-wider font-nunito z-40">
            <div className="bg-white shadow-md rounded-lg p-5 md:p-20 relative ">
                {isLoading && <Loader />}

                <svg
                    onClick={() => setIsVisible(!isVisible)}
                    className="w-5 h-5 sm:w-6 sm:h-6 text-black absolute top-2 right-2 md:right-4 md:top-4 cursor-pointer"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                </svg>

                <h4 className="text-center pb-5 md:pb-10 text-lg">Create New Account</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-8">
                        <label htmlFor="name" className="block font-medium text-base tracking-wider">
                            Name
                        </label>
                        <input
                            type="name"
                            id="name"
                            className={`mt-1 block px-3 py-2 border border-black ${
                                errors.name ? "border-red-600 focus:border-red-600" : ""
                            }  rounded-sm w-64 px-3 py-2  focus:outline-none sm:text-base`}
                            {...register("name", {
                                required: "name is required",
                            })}
                        />
                        {errors.name && <span className="text-red-600 text-xs">{errors.name.message}</span>}
                    </div>

                    <div className="mb-8">
                        <label htmlFor="email" className="block font-medium text-base tracking-wider">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className={`mt-1 block px-3 py-2 border border-black ${
                                errors.email ? "border-red-600 focus:border-red-600" : "border"
                            }  rounded-sm  w-64 px-3 py-2  focus:outline-none sm:text-base`}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && <span className="text-red-600 text-xs">{errors.email.message}</span>}
                    </div>

                    <div className="mb-8">
                        <label htmlFor="password" className="block font-medium text-base tracking-wider">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className={`mt-1 block px-3 py-2 border border-black ${
                                errors.password ? "border-red-600 focus:border-red-600" : ""
                            }  rounded-sm w-64 px-3 py-2  focus:outline-none sm:text-base`}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters",
                                },
                            })}
                        />
                        {errors.password && <span className="text-red-600 text-xs">{errors.password.message}</span>}
                    </div>

                    <button type="submit" className="w-full  bg-blue-600 text-white py-2 px-4 rounded-sm hover:bg-blue-700 focus:outline-none">
                        SignUp
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
