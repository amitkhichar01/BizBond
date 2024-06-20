import axios from "axios";

export async function fetchUserData(userId) {
    try {
        const res = await axios.get(`/api/users/${userId}`);
        return res.data;
    } catch (error) {
        throw new Error("Failed to fetch user data");
    }
}

export async function fetchPostData() {
    try {
        const res = await axios.get(`/api/posts`);
        return res.data;
    } catch (error) {
        throw new Error("Failed to fetch post data");
    }
}

export const fetchUserFollowers = async (userId) => {
    try {
        const res = await axios.get(`/api/users/${userId}/followers`);
        return res.data;
    } catch (error) {
        throw new Error("Failed to fetch followers");
    }
};

export const fetchUserFollowing = async (userId) => {
    try {
        const res = await axios.get(`/api/users/${userId}/following`);
        return res.data;
    } catch (error) {
        throw new Error("Failed to fetch following");
    }
};
