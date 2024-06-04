import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession, signIn } from "next-auth/react";
import Loader from "./Loader";
import {toggleBodyOverflow} from "@/utils/helpers";

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { data: session, status } = useSession();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

        useEffect(() => {
            const cleanup = toggleBodyOverflow(isLoading);
            return cleanup;
        }, [isLoading]);



    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            let { email, password } = data;

            if (session && session.user) {
                if (session.user.email === email) {
                    setIsLoading(false);
                    return alert("User already logged in");
                }
            }

            // Trim email and password
            email = email.trim();
            password = password.trim();

            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

         if (result.error) {
             const field = result.error.includes("Email") ? "email" : "password";
             setError(field, { type: "manual", message: result.error });
             return;
         }

        } catch (error) {
            console.error("Error during Login :", error);
            setMessage(error.response?.data?.message || "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={` max-w-md shadow-md rounded-md`}>
            {isLoading && <Loader />}
            <div className="mb-6">
                <label htmlFor="email" className="block text-base font-medium  text-gray-200 tracking-wider">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    className={`mt-1 block w-full px-3 py-2 border ${
                        errors.email ? "border-red-500 focus:border-red-500" : "border-gray-400 focus:border-blue-500"
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
                <label htmlFor="password" className="block font-medium text-gray-200 text-base tracking-wider">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    className={`mt-1 block w-full px-3 py-2 border ${
                        errors.password ? "border-red-500 focus:border-red-500" : "border-gray-400 focus:border-blue-500"
                    } rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-base bg-black text-white`}
                    {...register("password", {
                        required: "Password is required",
                    })}
                />
                {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
            </div>

            <div className="text-center">
                <button type="submit" className="text-center tracking-wider bg-blue-600 text-white py-2 px-8 rounded-sm hover:bg-blue-700 focus:outline-none focus:bg-blue-600">
                    Login
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
