import dbConnect from "@/app/(backend)/api/middleware/dbConnect";
import User from "@/app/(backend)/api/models/User";

export async function PUT(req, res) {
    const { userId, data, subObjKey } = await req.json();

    if (data.length <= 0) {
        return new Response(JSON.stringify({ error: "Invalid request data" }), { status: 400 });
    }

    try {
        await dbConnect();

        const filter = { _id: userId };

        let update;

        if (subObjKey) {
            update = {
                $set: { [`${subObjKey}`]: { ...data } },
            };
        } else {
            update = {
                $set: { ...data },
            };
        }
        const result = await User.updateOne(filter, update, { new: true });

        if (result.modifiedCount !== 0) {
            return new Response(JSON.stringify({ message: "User details updated successfully" }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: "User not found or no changes made" }), { status: 200 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
