import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    image_url: { type: String },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
        {
            author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
            content: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
        },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);


export default Post;
