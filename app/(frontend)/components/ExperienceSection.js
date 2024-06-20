import React, { useState } from "react";
import EditForm from "./EditForm";

const ExperienceSection = ({ user, editBtn }) => {
    const [editForm, setEditForm] = useState(false);

    return (
        <section className="bg-white rounded-lg mt-5 p-5 tracking-wide relative">
            {editForm && (
                <EditForm
                    number="4"
                    heading="Open To work"
                    names={["Company", "Position", "Start_year", "End_year"]}
                    values={user.experience ? [user.experience.company, user.experience.position, user.experience.start_year, user.experience.end_year] : [" "]}
                    userId={user._id.toString()}
                    subObjKey={"experience"}
                />
            )}
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
            <h1 className="text-lg sm:text-xl font-bold">Experience</h1>
            <hr className="my-3" />

            {user.experience ? (
                <div>
                    <h1 className="text-md sm:text-lg font-bold pb-1">{user.experience.company}</h1>
                    <p className="text-md sm:text-lg font-semibold py-1">{user.experience.position}</p>
                    <p className="text-sm font-semibold py-1">
                        {user.experience.start_year} - {user.experience.end_year}
                    </p>
                </div>
            ) : (
                <p>Detail your professional experience to let others see your career journey.</p>
            )}
        </section>
    );
};

export default ExperienceSection;
