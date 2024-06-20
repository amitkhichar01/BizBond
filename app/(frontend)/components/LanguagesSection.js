import React, { useState } from "react";
import EditForm from "./EditForm";

const LanguagesSection = ({ user, editBtn }) => {
    const [editForm, setEditForm] = useState(false);

    return (
        <section className="bg-white rounded-lg mt-5 p-5 tracking-wide relative">
            {editForm && <EditForm number="1" heading="Language" names={["Language"]} values={[user.language]} userId={user._id.toString()} />}
            {editBtn && (
                <button onClick={() => setEditForm(!editForm)} className="absolute top-3 right-3">
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
            <h1 className="text-lg sm:text-xl font-bold">Language</h1>
            <hr className="my-3" />
            {user.language.length ? (
                <>
                    {user.language.map((data, index) => (
                        <p key={index} className="text-md sm:text-lg font-semibold pb-1">
                            {data}
                        </p>
                    ))}
                </>
            ) : (
                <p>List the languages you speak to broaden your professional reach.</p>
            )}
        </section>
    );
};

export default LanguagesSection;
