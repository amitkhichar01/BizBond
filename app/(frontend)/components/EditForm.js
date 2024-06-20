import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toggleBodyOverflow } from "@/utils/domUtils";

const EditForm = ({ number, heading, names, values, userId, subObjKey }) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const [isVisible, setIsVisible] = useState(true);

    const onSubmit = async (data) => {
        const convertKeysToLowercase = (obj) => Object.fromEntries(Object.entries(obj).map(([key, value]) => [key.toLowerCase(), value]));

        const newData = convertKeysToLowercase(data);

        try {
            const response = await axios.put("/api/users/update-profile", {
                data: newData,
                userId: userId,
                subObjKey: subObjKey,
            });
            setIsVisible(false);
          
            // Refresh the page
            location.reload();
        } catch (error) {
            console.error("Failed to update user details:", error);
        }
    };

    useEffect(() => {
        const cleanup = toggleBodyOverflow(isVisible);
        return cleanup;
    }, [isVisible]);

    return (
        <div className="z-40 overflow-auto">
            {isVisible && (
                <div className="fixed z-40 inset-0 bg-gray-800  bg-opacity-50 flex items-center justify-center overflow-auto">
                    <div className="bg-white p-4 rounded w-[90vw] sm:w-[50vw] relative">
                        <svg
                            onClick={() => setIsVisible(false)}
                            className="w-5 h-5 sm:w-6 sm:h-6 z-11 text-black absolute top-2 right-2 md:right-4 md:top-4 cursor-pointer"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                        </svg>
                        <h1 className=" text-lg sm:text-xl font-bold sm:my-4">{heading}</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {Array.from({ length: number }).map((_, i) => (
                                <div key={i} className="mb-1 sm:mb-4">
                                    <label htmlFor={names[i]} className="block font-semibold text-sm  sm:text-md">
                                        {names[i]}
                                    </label>
                                    <input
                                        id={names[i]}
                                        {...register(names[i], { required: true })}
                                        defaultValue={values[i]}
                                        className="mt-1 p-1 block w-full rounded text-xs border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md"
                                    />
                                    {errors[names[i]] && <span className="text-red-500 text-sm">This field is required</span>}
                                </div>
                            ))}

                            <div className="flex justify-end">
                                <button type="submit" className="bg-blue-500 text-white font-semibold text-sm sm:text-md px-4 py-2 mt-2 sm:mt-0 rounded">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditForm;
