const Post  = () => {
    return (
        <div className="h-svh bg-black text-white px-4">
            <div className="flex justify-center items-center gap-6 mb-10">
                <h1 className="text-xl font-bold">
                    POST
                </h1>
                <h1 className="text-xl">
                    STORY
                </h1>
                <h1 className="text-xl">
                    REEL
                </h1>
            </div>
            <div className="flex justify-center items-center ">
                <form action="">
                    <label htmlFor="" className="pb-4">Choose images to post</label> <br />
                    <input type="file" className="w-full mb-4" /> <br />
                    <label htmlFor="" className="pb-4">Add Caption</label> <br />
                    <textarea type="text" className="w-full" /> <br />
                    <div className="flex items-start justify-center mt-4">
                        <button className="border-2 px-4 rounded">
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};
export default Post;
