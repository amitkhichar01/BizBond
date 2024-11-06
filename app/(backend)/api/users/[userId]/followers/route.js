import dbConnect from "@/app/(backend)/api/middleware/dbConnect";
import Follower from "@/app/(backend)/api/models/Followers";
import User from "@/app/(backend)/api/models/User";

export async function GET({ params }) {
    try {
        const { userId } = await params;

        await dbConnect();

        if (!userId) {
            return new Response(JSON.stringify({ message: "Missing userId query parameter" }), { status: 400 });
        }

        // Find the user by userId to get the networkUser name
        const user = await User.findById(userId, "name");
        if (!user) {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        }

        const networkUser = user.name;

        // Find the followers (if any) for the user
        const followers = await Follower.find({ user_id: userId }).populate("follower_id", "name profile_url headline");

        return new Response(JSON.stringify({ followers, networkUser }), { status: 200 });
    } catch (error) {
        console.error("Error fetching followers:", error);

        return new Response(JSON.stringify({ message: "Failed to fetch followers" }), { status: 500 });
    }
}
