import mongoose from "mongoose";

const FollowerSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // The user who is being followed
    follower_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // The user who is following
    followedAt: { type: Date, default: Date.now }, // Timestamp of when the follow action occurred
});

const Follower = mongoose.models.Follower || mongoose.model("Follower", FollowerSchema);

export default Follower;