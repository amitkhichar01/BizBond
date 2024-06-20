"user client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession, signIn } from "next-auth/react";
import Loader from "./Loader";
import { toggleBodyOverflow } from "@/utils/domUtils";

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { data: session, status } = useSession();

    const {
        register,
        handleSubmit,
        setError,
        setValue,
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
            setValue('email', "");
            setValue("password", "");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {isLoading && <Loader />}
            <div className="mb-6">
                <label htmlFor="email" className="block text-base font-medium tracking-wider">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    className={`mt-1 block w-full px-3 py-2 border ${
                        errors.email ? "border-red-600 focus:border-red-600" : "border border-black"
                    }  rounded-sm max-w-xs px-3 py-2  bg-white focus:outline-none sm:text-base`}
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
                    className={`mt-1 block w-full px-3 py-2 border ${
                        errors.password ? "border-red-600 focus:border-red-600" : "border border-black"
                    }  rounded-sm  max-w-xs px-3 py-2 bg-white  focus:outline-none sm:text-base`}
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

            <div className="text-center">
                <button type="submit" className="text-center tracking-wider bg-blue-600 text-white py-2 px-8 rounded-sm hover:bg-blue-700 focus:outline-none focus:bg-blue-600">
                    Login
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
