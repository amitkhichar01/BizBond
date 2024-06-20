import dbConnect from "@/app/(backend)/api/middleware/dbConnect";
import User from "@/app/(backend)/api/models/User";

export async function GET(req, { params }) {
    const { userId } = params;

    await dbConnect();

    try {
        const user = await User.findById(userId).lean();

        if (user) {
            return new Response(JSON.stringify(user), {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } else {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        }
    } catch (error) {
        console.error("Server error:", error);

        return new Response(JSON.stringify({ message: "Server error! (500)" }), { status: 500 });
    }
}
