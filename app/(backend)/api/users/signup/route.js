import dbConnect from "@/app/(backend)/api/middleware/dbConnect";
import User from "@/app/(backend)/api/models/User";

export async function POST(req) {
    const { name, email, password } = await req.json();

    try {
        await dbConnect();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return new Response(JSON.stringify({ message: "Email already in use" }), { status: 400 });
        }

        const user = new User({ name, email, password });

        await user.save();

        return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Server error ! (500)" }), { status: 500 });
    }
}
