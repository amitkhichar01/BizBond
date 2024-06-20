import React, { useState } from "react";
import CreatePost from "./CreatePost";

const PostSection = ({ editBtn }) => {
    const [addPost, setAddPost] = useState(false);

    return (
        <section className="bg-white rounded-lg mt-5 p-5 tracking-wide relative">
            {addPost && <CreatePost />}
            {editBtn && (
                <button onClick={() => setAddPost(!addPost)} className="absolute top-3 right-3">
                    <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800 dark:text-gray-800"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                        />
                    </svg>
                </button>
            )}
            <div className="mt-4 p-4 bg-white shadow-md rounded-md">
                <h2 className="text-lg sm:text-xl font-semibold mb-2">My Posts</h2>
                <hr className="my-3" />
                <p className="text-gray-600 text-sm sm:text-md">
                    You can view your posts on the{" "}
                    <a href="/" className="text-blue-500 hover:underline">
                        Home page
                    </a>
                    .
                </p>
            </div>
        </section>
    );
};

export default PostSection;
