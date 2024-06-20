import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import EditForm from "./EditForm";
import axios from "axios";
import { useSession } from "next-auth/react";
import { applyImageTransformation } from "@/utils/imageUtils";

const ProfileBanner = ({ user, editBtn }) => {
    const [editForm, setEditForm] = useState(false);
    const { data: session } = useSession();
    const [sessionUserId, setSessionUserId] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [follow, setFollow] = useState(false);

    useEffect(() => {
        if (session && session.user) {
            setSessionUserId(session.user.id);
        }
    }, [session]);

    const fetchFollowers = useCallback(async () => {
        if (!user || !user._id) return;

        try {
            const res = await axios.get("/api/follow", { params: { userId: user._id } });
            setFollowers(res.data.follower);
            setFollowing(res.data.following);
        } catch (error) {
            console.error("Error fetching followers:", error);
        }
    }, [user]);

    useEffect(() => {
        fetchFollowers();
    }, [fetchFollowers]);

    useEffect(() => {
        if (followers.some((follower) => follower.follower_id === sessionUserId)) {
            setFollow(true);
        } else {
            setFollow(false);
        }
    }, [followers, sessionUserId]);

    const handleFollowUser = async () => {
        if (user._id === sessionUserId) {
            alert("You cannot follow yourself.");
            return;
        }
        if (!sessionUserId) {
            alert("you must be signed in to follow.");
            return;
        }

        try {
            const response = await axios.post("/api/follow", {
                user_id: user._id,
                follower_id: sessionUserId,
            });
            setFollow(!follow);
            fetchFollowers();
        } catch (error) {
            console.error("Error following user:", error);
        }
    };

    const handleUnFollowUser = async () => {
        try {
            const response = await axios.delete("/api/follow", {
                data: {
                    user_id: user._id,
                    follower_id: sessionUserId,
                },
            });
            setFollow(!follow);
            fetchFollowers();
        } catch (error) {
            console.error("Error unfollowing user:", error);
        }
    };

    return (
        <section className="bg-white rounded-lg">
            {editForm && (
                <EditForm
                    number="6"
                    heading="Profile Edit"
                    names={["Banner_Url", "Profile_Url", "Name", "Headline", "City", "Country"]}
                    values={[user.banner_url, user.profile_url, user.name, user.headline, user.city, user.country]}
                    userId={user._id.toString()}
                />
            )}
            <div>
                <Image
                    src={applyImageTransformation(user.banner_url, "w_1900,c_fill")}
                    className="object-fill w-full rounded-t-sm h-[25vh] sm:h-[40vh]"
                    width={1920}
                    height={1080}
                    alt="Banner Image"
                    priority
                />
            </div>
            <div className="p-5 relative">
                <Image
                    src={applyImageTransformation(user.profile_url, "w_400,h_400,c_thumb,g_face")}
                    className=" p-1 sm:p-2 bg-white w-24 h-24 sm:w-40 sm:h-40 rounded-full shadow-sm shadow-gray-300 object-fill absolute -top-[50px] sm:-top-[110px]"
                    width={400}
                    height={400}
                    alt="Profile Image"
                    priority
                />
                {editBtn && (
                    <button onClick={() => setEditForm(!editForm)} className="absolute top-3 right-3">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
            </div>
            <div className="py-4 pl-5 flex flex-col items-start md:flex-row md:items-center justify-between">
                <div>
                    <h3 className=" sm:pt-3 font-bold text-lg  sm:text-xl md:text-2xl uppercase">{user.name}</h3>
                    {user.headline ? (
                        <h6 className=" text-sm sm:text-lg tracking-wider uppercase">{user.headline}</h6>
                    ) : (
                        <p className="text-gray-600 text-sm">Create a headline to let others know what you&#39;re passionate about.</p>
                    )}
                    {user.city && user.country ? (
                        <p className="py-3 text-gray-500 flex items-center gap-2 text-sm sm:text-md">
                            <svg className="w-5 h-5 text-gray-800 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    fillRule="evenodd"
                                    d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {user.city}, {user.country}
                        </p>
                    ) : (
                        <p className="text-gray-500 text-sm">Add your location ?</p>
                    )}
                    <p className="text-blue-700 font-semibold text-sm sm:text-md">
                        <Link href={`/mynetwork/${user._id}?section=followers`}>
                            <span>{followers.length} followers . </span>
                        </Link>
                        <Link href={`/mynetwork/${user._id}?section=following`}>
                            <span>{following.length} following</span>
                        </Link>
                    </p>
                </div>
                <div className="self-end mt-5 mr-5 flex">
                    {user._id !== sessionUserId && (
                        <>
                            <div className="px-4 md:px-8 py-2 rounded-md bg-gray-200 border-black font-semibold hover:bg-gray-300 relative">
                                <span className="line-through blur-[1px] text-sm sm:text-md">Message</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-red-950 absolute top-5 right-5 hidden md:inline">coming soon</span>
                            </div>

                            {follow ? (
                                <button
                                    onClick={handleUnFollowUser}
                                    className="px-4 md:px-8 py-2 ml-5 rounded-md bg-gradient-to-r to-blue-600 from-blue-950 hover:bg-gray-300 border-black font-semibold text-white text-sm sm:text-md"
                                >
                                    UnFollow
                                </button>
                            ) : (
                                <button
                                    onClick={handleFollowUser}
                                    className=" px-4 md:px-8 py-2 ml-5 rounded-md bg-gradient-to-r to-blue-600 from-blue-950 hover:bg-gray-300 border-black font-semibold text-white text-sm sm:text-md"
                                >
                                    Follow
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProfileBanner;
