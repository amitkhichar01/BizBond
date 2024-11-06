
import Image from "next/image";
import Link from "next/link";
import { applyImageTransformation } from "@/utils/imageUtils";

const FollowingSection = ({ following }) => {
    if (!following.length) {
        return <div className="pl-7 pt-4"> You are not following anyone yet.</div>;
    }

    return (
        <div className="flex flex-col w-full pl-7 pt-4 border-t-bla-t-2">
            {following.map((user, index) => (
                <div key={user.user_id?._id || index} className="flex gap-3 w-full items-center">
                    <Link href={`/user/${user.user_id?._id}`}>
                        <Image
                            src={applyImageTransformation(user.user_id?.profile_url, "w_400,h_400,c_thumb,g_face")}
                            width={100}
                            height={100}
                            alt={user.user_id?.name || "Profile image"}
                            className="object-fill w-14 h-14 rounded-full mr-4 mt-[5px]"
                            priority
                        />
                    </Link>

                    <div className={`w-full ${index === following.length - 1 ? "border-none" : "border-b border-b-gray-200"} py-6`}>
                        <Link href={`/user/${user.user_id?._id}`}>
                            <p className="font-bold text-lg">{user.user_id?.name}</p>
                            <p className="text-gray-600 text-sm">{user.user_id?.headline}</p>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FollowingSection;
