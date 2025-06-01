import dbConnect from "@/app/(backend)/api/middleware/dbConnect";
import Post from "@/app/(backend)/api/models/Post";
import User from "@/app/(backend)/api/models/User"; 

export async function POST(req) {
    try {
        await dbConnect();

        const { data, author } = await req.json();
        const post = new Post({ ...data, author });
        await post.save();

        return new Response(JSON.stringify({ message: "Post registered successfully" }), { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);

        return new Response(JSON.stringify({ message: "Server error ! (500)" }), { status: 500 });
    }
}

export async function GET(req) {
    try {
        await dbConnect();
        const posts = await Post.find({}).sort({ createdAt: -1 }).populate("author", "name profile_url headline").populate("comments.author", "name profile_url headline");

        return new Response(JSON.stringify(posts), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error creating post:", error);

        return new Response(JSON.stringify({ message: "Server error ! (500)" }), { status: 500 });
    }
}

export async function PUT(req) {
    try {
        await dbConnect();

        const { postId, sessionUserId, comment, like } = await req.json();

        let post = await Post.findById(postId);

        if (!post) {
            return new Response(JSON.stringify({ message: "Post not found" }), { status: 404 });
        }

        if (comment) {
            const newComment = {
                content: comment,
                author: sessionUserId,
                createdAt: new Date(),
            };

            post.comments.unshift(newComment);

            await post.save();

            await post.populate("comments.author", "name profile_url headline");

            return new Response(JSON.stringify({ comments: post.comments }), { status: 200 });
        } else if (like) {
            // Toggle like status
            if (post.likes.includes(sessionUserId)) {
                post.likes = post.likes.filter((userId) => userId.toString() !== sessionUserId);

                await post.save();

                return new Response(JSON.stringify({ likes: post.likes }), { status: 200 });
            } else {
                post.likes.push(sessionUserId);

                await post.save();

                return new Response(JSON.stringify({ likes: post.likes }), { status: 200 });
            }
        }
    } catch (error) {
        console.error("Error updating post likes:", error);

        return new Response(JSON.stringify({ message: "Server error ! (500)" }), { status: 500 });
    }
}
