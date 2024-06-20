const Loader = () => (
    <div className="flex flex-col bg-[--bg-SlateGray-color] fixed top-0 left-0 w-full h-full">
        <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
            <div className="flex justify-center">
                <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="isLoading">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    </div>
);

export default Loader;
