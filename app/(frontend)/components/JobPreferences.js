import React, { useState } from "react";
import EditForm from "./EditForm";

const JobPreferences = ({ user, editBtn }) => {
    const [editForm, setEditForm] = useState(false);

    return (
        <section className="bg-white w-full rounded-lg mt-5 p-5 relative flex-1">
            {editForm && (
                <EditForm
                    number="3"
                    heading="Open To work"
                    names={["Job_title", "Location_type", "Start_date"]}
                    values={user.job_preferences ? [user.job_preferences.job_title, user.job_preferences.location_type, user.job_preferences.start_date] : [" "]}
                    userId={user._id.toString()}
                    subObjKey={"job_preferences"}
                />
            )}
            {editBtn && (
                <button onClick={() => setEditForm(!editForm)} className="absolute top-3 right-3">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800 dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
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
            <h1 className=" text-lg sm:text-xl font-bold">Open to Work</h1>
            <hr className="my-3" />
            {user.job_preferences ? (
                <>
                    <div className="my-3">
                        <p className="font-semibold text-md sm:text-lg">Job title</p>
                        {user.job_preferences.job_title.map((data, index) => (
                            <p key={index} className="text-md sm:text-lg">
                                {data}
                            </p>
                        ))}
                    </div>
                    <div className="my-3">
                        <p className="font-semibold text-md sm:text-lg">Location type</p>
                        {user.job_preferences.location_type.map((data, index) => (
                            <p key={index} className="text-md sm:text-lg">
                                {data}
                            </p>
                        ))}
                    </div>
                    <div className="my-3">
                        <p className="font-semibold text-md sm:text-lg">Start date</p>
                        <p className="text-md sm:text-lg">{user.job_preferences.start_date}</p>
                    </div>
                </>
            ) : (
                <p>Share your skills and let others know what kind of work you&#39;re looking for.</p>
            )}
        </section>
    );
};

export default JobPreferences;
