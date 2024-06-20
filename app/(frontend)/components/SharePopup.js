import { useState, useEffect } from "react";
import { toggleBodyOverflow } from "@/utils/domUtils";

const SharePopup = ({ post, setSharePost }) => {
    const [copied, setCopied] = useState(false);
    const postUrl = `https://bizbond.onrender.com/post/${post._id}`;
 
    useEffect(() => {
     const cleanup = toggleBodyOverflow(setSharePost);
     return cleanup;
 }, [setSharePost]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(postUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-11/12 sm:w-1/2 lg:w-1/3 relative">
                <svg
                    onClick={() => setSharePost(null)}
                    className="w-5 h-5 sm:w-6 sm:h-6 text-black absolute top-3 right-3 cursor-pointer"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                </svg>
                <h2 className="text-lg font-bold mb-6">Share</h2>
                <div className="flex justify-between items-center flex-wrap text-sm">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 font-semibold">
                        <svg
                            className=" w-9 h-9 sm:w-12 sm:h-12 bg-blue-800 text-white p-2 rounded-full"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path fillRule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clipRule="evenodd" />
                        </svg>
                        Facebook
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=${postUrl}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 font-semibold">
                        <svg
                            className="w-9 h-9 sm:w-12 sm:h-12 bg-black text-white p-2 rounded-full"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
                        </svg>
                        X
                    </a>
                    <a href={`https://api.whatsapp.com/send?text=${postUrl}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 font-semibold">
                        <svg
                            className="w-9 h-9 sm:w-12 sm:h-12 bg-green-500 text-white p-2 rounded-full"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z"
                                clipRule="evenodd"
                            />
                            <path
                                fill="currentColor"
                                d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z"
                            />
                        </svg>
                        WhatsApp
                    </a>
                    <a href={`https://www.instagram.com/?url=${postUrl}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 font-semibold">
                        <svg
                            className="w-9 h-9 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-purple-500 text-white p-2 rounded-full"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Instagram
                    </a>
                </div>
                <div className="text-md font-medium mt-6 border bg-gray-100 p-2 rounded-lg flex justify-between items-center overflow-hidden">
                    <span className="overflow-hidden overflow-ellipsis whitespace-nowrap text-sm sm:text-md">{postUrl}</span>
                    <button className="ml-4 bg-blue-600 text-white px-4 py-2 rounded" onClick={handleCopyLink}>
                        {copied ? "Copied!" : "Copy"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SharePopup;
