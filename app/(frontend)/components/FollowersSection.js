import Image from "next/image";
import Link from "next/link";
import { applyImageTransformation } from "@/utils/imageUtils";

const FollowingSection = ({ followers }) => {
    if (!followers.length) {
        return <div className="pl-7 pt-4">You don&#39;t have any followers yet.</div>;
    }

    return (
        <div className="flex flex-col w-full pl-7 pt-4 border-t-bla-t-2">
            {followers.map((user, index) => (
                <div key={user.follower_id?._id || index} className="flex gap-3 w-full items-center">
                    <Link href={`/user/${user.follower_id?._id}`}>
                        <Image
                            src={applyImageTransformation(user.follower_id?.profile_url, "w_400,h_400,c_thumb,g_face")}
                            width={100}
                            height={100}
                            alt={user.follower_id?.name || "Profile image"}
                            className="object-fill w-14 h-14 rounded-full mr-4 mt-[5px]"
                        />
                    </Link>

                    <div className={`w-full ${index === followers.length - 1 ? "border-none" : "border-b border-b-gray-200"} py-6`}>
                        <Link href={`/user/${user.follower_id?._id}`}>
                            <p className="font-bold text-lg">{user.follower_id?.name}</p>
                            <p className="text-gray-600 text-sm">{user.follower_id?.headline}</p>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FollowingSection;
