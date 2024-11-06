"use client";
import React ,{ useEffect, useState } from "react";
import { useRouter, useSearchParams, notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import FollowersSection from "../../components/FollowersSection";
import FollowingSection from "../../components/FollowingSection";
import { fetchUserFollowers, fetchUserFollowing } from "@/utils/apiUtils";

const UserProfile = ({ params }) => {
    const { userId } = React.use(params);
    const searchParams = useSearchParams();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [networkUser, setNetworkUser] = useState();
    const [section, setSection] = useState(searchParams.get("section"));

    useEffect(() => {
        const fetchList = async () => {
            setIsLoading(true);
            if (section === "followers") {
                const data = await fetchUserFollowers(userId);

                setFollowers(data.followers);
                setNetworkUser(data.networkUser);
            } else if (section === "following") {
                const data = await fetchUserFollowing(userId);

                setFollowing(data.following);
                setNetworkUser(data.networkUser);
            }
            setIsLoading(false);
        };
        if (section === "followers" || section === "following") {
            fetchList();
        } else {
            notFound();
        }
    }, [section, userId]);

    const handleSectionChange = (newSection) => {
        setSection(newSection);
        router.push(`/mynetwork/${userId}?section=${newSection}`);
    };

    return (
        <>
            <Navbar />
            {isLoading && <Loader />}
            <section className="pt-24 pb-9 bg-gray-100 flex justify-center items-start font-nunito">
                <section className="bg-white border-none flex flex-col justify-start items-start w-[90vw] md:w-[60vw] rounded">
                    <p className="text-2xl font-semibold px-5 py-3 text-transparent bg-clip-text bg-gradient-to-r to-red-500 from-purple-800 ">{networkUser}</p>

                    <div className="flex justify-center items-center gap-10 pl-6  font-semibold w-full">
                        <button
                            className={`border-b-2 ${section === "followers" && "border-b-black"} py-3 text-transparent bg-clip-text bg-gradient-to-r to-purple-500 from-blue-800`}
                            onClick={() => handleSectionChange("followers")}
                        >
                            Followers
                        </button>
                        <button
                            className={`border-b-2 ${section === "following" && "border-b-black"} py-3 text-transparent bg-clip-text bg-gradient-to-r to-purple-500 from-blue-800`}
                            onClick={() => handleSectionChange("following")}
                        >
                            Following
                        </button>
                    </div>

                    {section === "followers" && <FollowersSection followers={followers} />}
                    {section === "following" && <FollowingSection following={following} />}
                </section>
            </section>
        </>
    );
};

export default UserProfile;
