import React, { useState } from "react";
import Link from "next/link";
import EditForm from "./EditForm";

const ContactInfo = ({ user, editBtn }) => {
    const [editForm, setEditForm] = useState(false);

    return (
        <section className="bg-white w-full rounded-lg mt-5 p-5 relative flex-1">
            {editForm && (
                <EditForm
                    number="3"
                    heading="Contact_info"
                    names={["Website_url", "Phone_number", "Address"]}
                    values={user.contact_info ? [user.contact_info.website_url, user.contact_info.phone_number, user.contact_info.address] : [" "]}
                    userId={user._id.toString()}
                    subObjKey={"contact_info"}
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
            <h4 className="text-lg sm:text-xl font-bold">Contact Info</h4>
            <hr className="my-3" />
            {user.contact_info ? (
                <>
                    <div className="flex items-start justify-between p-2">
                        <p className="font-semibold text-md sm:text-lg">Website Url</p>
                        <Link href={`${user.contact_info.website_url}`} target="_blank" className="w-1/2 text-sm sm:text-lg text-end text-blue-700 font-semibold text-ellipsis overflow-hidden">
                            {user.contact_info.website_url}
                        </Link>
                    </div>
                    <div className="flex items-start justify-between p-2">
                        <p className="font-semibold text-md sm:text-lg">Phone Number</p>
                        <p className="w-1/2 text-end text-sm sm:text-lg">{user.contact_info.phone_number}</p>
                    </div>
                    <div className="flex items-start justify-between p-2">
                        <p className="font-semibold text-md sm:text-lg">Address</p>
                        <p className="w-1/2 text-end text-sm sm:text-lg text-ellipsis overflow-hidden">{user.contact_info.address}</p>
                    </div>
                    <div className="flex items-start justify-between p-2">
                        <p className="font-semibold text-md sm:text-lg">Email</p>
                        <p className="w-full text-end text-sm sm:text-lg text-ellipsis">{user.email}</p>
                    </div>
                </>
            ) : (
                <p className="text-md">Add your Contact details so people reach out you and contact</p>
            )}
        </section>
    );
};

export default ContactInfo;
