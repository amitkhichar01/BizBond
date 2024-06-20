const Search = () => {
    return (
        <form className="mx-auto">
            <div className="flex">
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
                        <svg className="w-3.5 h-3.5 text-black dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="search-dropdown"
                        className=" pl-8 p-1 w-[20vw] text-md text-black  bg-gray-200 rounded-sm border border-white  focus:ring-1 focus:outline-none focus:ring-white"
                        placeholder="Search..."
                        required
                    />
                </div>
            </div>
        </form>
    );
};

export default Search;
