"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchUserData } from "@/utils/apiUtils";
import Navbar from "../../components/Navbar";
import ProfileBanner from "../../components/ProfileBanner";
import JobPreferences from "../../components/JobPreferences";
import ContactInfo from "../../components/ContactInfo";
import AboutSection from "../../components/AboutSection";
import SkillsSection from "../../components/SkillsSection";
import LanguagesSection from "../../components/LanguagesSection";
import EducationSection from "../../components/EducationSection";
import ExperienceSection from "../../components/ExperienceSection";
import PostSection from "../../components/PostSection";
import Loader from "../../components/Loader";

const UserProfile = ({ params }) => {
    const { userId } = params;
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editBtn, setEditBtn] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        fetchUserData(userId)
            .then((data) => {
                setUser(data);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setIsLoading(false);
            });
    }, [userId]);

    useEffect(() => {
        if (session && user) {
            setEditBtn(session.user.email === user.email);
        }
    }, [session, user]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>No user data found</div>;
    }

    return (
        <>
            <Navbar user={user} />
            <section className="pt-24 pb-9 flex justify-center items-start tracking-wide font-nunito">
                <section className="w-full sm:w-[80vw] md:w-[70vw]">
                    <ProfileBanner user={user} editBtn={editBtn} />

                    <section className="flex justify-center items-stretch flex-col md:flex-row gap-5 w-full">
                        <JobPreferences user={user} editBtn={editBtn} />
                        <ContactInfo user={user} editBtn={editBtn} />
                    </section>
                    <PostSection editBtn={editBtn} />
                    <AboutSection user={user} editBtn={editBtn} />
                    <SkillsSection user={user} editBtn={editBtn} />
                    <LanguagesSection user={user} editBtn={editBtn} />
                    <EducationSection user={user} editBtn={editBtn} />
                    <ExperienceSection user={user} editBtn={editBtn} />
                </section>
            </section>
        </>
    );
};

export default UserProfile;
