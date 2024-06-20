import dbConnect from "@/app/(backend)/api/middleware/dbConnect";
import Post from "@/app/(backend)/api/models/Post";

export async function GET(req, { params }) {
    const { postId } = params;
    try {
        await dbConnect();
        const post = await Post.findById(postId).populate("author", "name profile_url headline").populate("comments.author", "name  profile_url headline");

        if (!post) {
            return new Response(JSON.stringify({ message: "Post not found" }, { status: 404 }));
        }
        return new Response(JSON.stringify(post), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }, { status: 500 }));
    }
}
