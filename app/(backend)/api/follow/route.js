import dbConnect from "@/app/(backend)/api/middleware/dbConnect";
import Follower from "@/app/(backend)/api/models/Followers";

export async function GET(req) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return new Response(JSON.stringify({ message: "Missing userId query parameter" }), { status: 400 });
        }

        const followers = await Follower.find({ user_id: userId });
        const following = await Follower.find({ follower_id: userId });

        return new Response(JSON.stringify({ follower: followers, following: following }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "not fetch following" }), { status: 500 });
    }
}

export async function POST(req) {
    try {
        await dbConnect();
        const { user_id, follower_id } = await req.json();

        // Check if the follower relationship already exists
        const existingFollower = await Follower.findOne({ user_id: user_id, follower_id: follower_id });

        if (existingFollower) {
            return new Response(JSON.stringify({ message: "User is already following this user" }), { status: 200 });
        }

        let followerData = {
            user_id: user_id,
            follower_id: follower_id,
        };

        const follower = new Follower(followerData);
        await follower.save();

        return new Response(JSON.stringify({ message: "Follower add successfully" }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Server error ! (500)" }), { status: 500 });
    }
}
export async function DELETE(req) {
    try {
        await dbConnect();

        // Extract user_id and follower_id from the request body
        const { user_id, follower_id } = await req.json();

        let followerData = {
            user_id: user_id,
            follower_id: follower_id,
        };

        await Follower.findOneAndDelete({ user_id: user_id, follower_id: follower_id });

        return new Response(JSON.stringify({ message: "Follower removed successfully" }), { status: 200 });
    } catch (error) {
        console.error("Error removing follower:", error);

        return new Response(JSON.stringify({ message: "Server error (500)" }), { status: 500 });
    }
}
