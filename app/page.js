"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "./(frontend)/components/Navbar";
import Loader from "./(frontend)/components/Loader";
import SharePopup from "./(frontend)/components/SharePopup";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { applyImageTransformation } from "@/utils/imageUtils";
import { formatRelativeTime } from "@/utils/timeUtils";
import Link from "next/link";

export default function Posts() {
    const { data: session } = useSession();
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sharePost, setSharePost] = useState(null);
    const [showComments, setShowComments] = useState({});
    const [sessionUserId, setSessionUserId] = useState(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    // Set user ID from session
    useEffect(() => {
        if (session && session.user) {
            setSessionUserId(session.user.id);
        }
    }, [session]);

    // Fetch posts data
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                axios.get("/api/posts").then((res) => {
                    
                    setPosts(res.data);

                    setIsLoading(false);
                });
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Handle post like action
    const handleLike = async (postId) => {
        try {
            if (!sessionUserId) {
                alert("Please signIn to like this post.");
                router.push("/login");
            }
            const response = await axios.put("/api/posts", { postId, sessionUserId, like: true });
            updatePostLikes(postId, response.data.likes);
        } catch (error) {
            setError(error.message);
        }
    };

    // Update post likes in state
    const updatePostLikes = (postId, likes) => {
        setPosts((prevPosts) => prevPosts.map((post) => (post._id === postId ? { ...post, likes } : post)));
    };

    // Toggle comments visibility
    const toggleComments = (postId) => {
        setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
    };

    const handleInput = (event) => {
        event.target.style.height = "28px"; // Reset the height
        event.target.style.height = `${event.target.scrollHeight}px`; // Set the height to the scroll height
    };

    // Handle comment submission
    const handleCommentSubmit = async (data, postId) => {
        try {
            const response = await axios.put("/api/posts", { postId, sessionUserId, comment: data.comment });
            updatePostComments(postId, response.data.comments);
            setValue("comment", "");
        } catch (error) {
            setError(error.message);
        }
    };

    const updatePostComments = (postId, comments) => {
        setPosts((prevPosts) => prevPosts.map((post) => (post._id === postId ? { ...post, comments } : post)));
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Render isLoading state
    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-start h-screen font-nunito pt-16">
                <div className="sm:py-7 flex flex-col gap-7 justify-center items-center w-full">
                    {posts ? (
                        posts.map((post) => (
                            <section key={post._id} className="bg-white text-black w-full sm:w-[50vw] rounded">
                                <div className="m-4">
                                    <div className="flex items-start mb-4">
                                        <Link href={`/user/${post.author._id}`}>
                                            <Image
                                                src={applyImageTransformation(post.author.profile_url, "w_400,h_400,c_thumb,g_face")}
                                                width={100}
                                                height={100}
                                                alt={post.author.name}
                                                className="object-fill w-14 h-14 rounded mr-4 mt-[5px]"
                                                priority
                                            />
                                        </Link>
                                        <div>
                                            <Link href={`/user/${post.author._id}`}>
                                                <p className="font-bold text-lg">{post.author.name}</p>
                                                <p className="text-gray-600 text-sm">{post.author.headline}</p>
                                                <p className="text-gray-500 text-sm">{formatRelativeTime(post.createdAt)}</p>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="min-h-20">
                                        <p className="mb-5 text-md sm:text-lg indent-4">{post.content}</p>
                                        {post.image_url && <Image src={post.image_url} width={1980} height={1080} alt="Post image" className="object-fill w-full h-[60vh] rounded-md" priority />}
                                    </div>
                                </div>
                                <hr className="mx-4 " />
                                <div className="flex justify-around items-end flex-wrap my-4">
                                    <div>
                                        <button
                                            onClick={() => handleLike(post._id)}
                                            className="flex items-center justify-center gap-2 rounded-full border px-3 sm:px-7 py-2  bg-gray-100 hover:bg-gray-300"
                                        >
                                            <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span>{post.likes.length}</span>
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => toggleComments(post._id)}
                                            className="flex items-center justify-center gap-2 rounded-full border px-3 sm:px-7 py-2 bg-gray-100 hover:bg-gray-300"
                                        >
                                            Comments
                                            <span>{post.comments && post.comments.length}</span>
                                        </button>
                                    </div>
                                    <div
                                        onClick={() => {
                                            setSharePost(post);
                                        }}
                                    >
                                        <button className="flex items-center justify-center gap-2 rounded-full border px-3 sm:px-7 py-2  bg-gray-100 hover:bg-gray-300">
                                            <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="m15.141 6 5.518 4.95a1.05 1.05 0 0 1 0 1.549l-5.612 5.088m-6.154-3.214v1.615a.95.95 0 0 0 1.525.845l5.108-4.251a1.1 1.1 0 0 0 0-1.646l-5.108-4.251a.95.95 0 0 0-1.525.846v1.7c-3.312 0-6 2.979-6 6.654v1.329a.7.7 0 0 0 1.344.353 5.174 5.174 0 0 1 4.652-3.191l.004-.003Z"
                                                />
                                            </svg>
                                            <span className="hidden sm:inline"> Share</span>
                                        </button>
                                    </div>
                                </div>
                                {showComments[post._id] && (
                                    <>
                                        <div className="mt-4 bg-gray-200 rounded-b p-4">
                                            <div className="flex justify-start items-start gap-4 rounded">
                                                {sessionUserId ? (
                                                    <>
                                                        <Link href={`/user/${session.user.id}`}>
                                                            <Image
                                                                src={applyImageTransformation(session.user.profile_url, "w_400,h_400,c_thumb,g_face")}
                                                                width={100}
                                                                height={100}
                                                                alt="Post image"
                                                                className="object-fill rounded w-10 h-10"
                                                                priority
                                                            />
                                                        </Link>

                                                        <form
                                                            onSubmit={handleSubmit((data) => handleCommentSubmit(data, post._id))}
                                                            className="flex-1 flex flex-col justify-start items-start gap-2 rounded"
                                                        >
                                                            <div className="w-full inline h-auto">
                                                                <textarea
                                                                    className="border-b border-b-gray-400 h-7 flex-1 bg-gray-200 resize-none overflow-hidden w-full focus:outline-none sm:text-lg"
                                                                    {...register("comment", {
                                                                        required: "comment is required",
                                                                    })}
                                                                    placeholder="Add a comment..."
                                                                    onInput={handleInput}
                                                                    row={1}
                                                                ></textarea>
                                                            </div>
                                                            <div className="self-end">
                                                                <button type="submit" className="bg-blue-600 text-white px-3 sm:px-4 py-2 text-sm sm:text-md rounded self-end">
                                                                    Comment
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </>
                                                ) : (
                                                    <p className="font-semibold">
                                                        Please sign in to comment -{" "}
                                                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r to-blue-500 from-blue-900 hover:to-blue-900 hover:from-blue-900">
                                                            <Link href={"/login"}>signIn page</Link>
                                                        </span>{" "}
                                                    </p>
                                                )}
                                            </div>

                                            {post.comments &&
                                                post.comments.map((comment, index) => (
                                                    <div key={index} className="mt-10">
                                                        <div className="flex justify-start items-start gap-4">
                                                            <Link href={`/user/${comment.author._id}`}>
                                                                <Image
                                                                    src={applyImageTransformation(comment.author.profile_url, "w_400,h_400,c_thumb,g_face")}
                                                                    width={100}
                                                                    height={100}
                                                                    alt="Post image"
                                                                    className="object-fill rounded w-10 h-10 self-center"
                                                                    priority
                                                                />
                                                            </Link>

                                                            <div className="flex flex-col items-start justify-center">
                                                                <Link href={`/user/${comment.author._id}`} className="font-bold text-base">
                                                                    {comment.author.name} <span className="text-gray-500 font-medium text-sm">/ {comment.author.headline}</span>
                                                                </Link>

                                                                <p className="hyphens-manual text-lg indent-1">{comment.content}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </>
                                )}
                            </section>
                        ))
                    ) : (
                        <p className="text-black bg-green-700 p-10">not have posts yet</p>
                    )}
                </div>
                {sharePost && <SharePopup post={sharePost} setSharePost={setSharePost} />}
            </div>
        </>
    );
}
