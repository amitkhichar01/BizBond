import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toggleBodyOverflow } from "@/utils/domUtils";

const CreatePost = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [isVisible, setIsVisible] = useState(true);
    const { data: session } = useSession();

    useEffect(() => {
        const cleanup = toggleBodyOverflow(isVisible);
        return cleanup;
    }, [isVisible]);

    const onSubmit = async (data) => {
        if (session?.user) {
            try {
                await axios.post("/api/posts", { data, author: session.user.id });
                setIsVisible(false);
            } catch (error) {
                console.error("Error creating post:", error);
            }
        } else {
            console.log("User not authenticated");
        }
    };

    return (
        <>
            {isVisible && (
                <div className="fixed z-40 inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded w-[90vw] sm:w-[50vw] relative overflow-hidden">
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
                        <h1 className="text-lg sm:text-xl font-bold my-4">Create Post</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label htmlFor="content" className="block font-semibold text-sm sm:text-md">
                                    Content
                                </label>
                                <textarea
                                    id="content"
                                    {...register("content", { required: "Content is required" })}
                                    placeholder="What do you want to talk about?"
                                    className="mt-1 p-1 block w-full h-[30vh] md:h-[40vh] rounded text-sm border border-gray-300 shadow-sm sm:text-md resize-none"
                                    style={{ overflowY: "auto" }} // Enable vertical scrollbar
                                    rows={1}
                                />
                                {errors.content && <span className="text-red-500 text-sm">This field is required</span>}

                                <label htmlFor="image_url" className="block font-semibold text-sm sm:text-md mt-4">
                                    Image URL
                                </label>
                                <textarea
                                    id="image_url"
                                    {...register("image_url")}
                                    className="mt-1 p-1 block w-full h-[8vh] md:h-[10vh] rounded text-sm border border-gray-300 shadow-sm sm:text-md resize-none"
                                    placeholder="Optional: image URL"
                                    style={{ overflowY: "auto" }} // Enable vertical scrollbar
                                    rows={1}
                                />
                                {errors.image_url && <span className="text-red-500 text-sm">Error</span>}
                            </div>

                            <div className="flex justify-end">
                                <button type="submit" className="bg-blue-500 text-white font-semibold text-sm sm:text-lg px-5 sm:px-7 py-2 rounded">
                                    Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreatePost;
