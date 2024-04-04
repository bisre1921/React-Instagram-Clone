import { useState } from "react";

const Post  = () => {
    const [postData , setPostData] = useState({
        postImage : "" , 
        postCaption : "" ,
    });
    const {postImage , postCaption} = postData;

    const handlePostDataFormInputChange = (event) => {
        if(event.target.files) {
            setPostData((prevState) => ({
                ...prevState , 
                postImage : event.target.files
            }))
        } 
        if(!event.target.files) {
            setPostData((prevState) => ({
                ...prevState , 
                [event.target.id] : event.target.value
            }))
        }

        console.log(postCaption);
       
       
    }
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
                <form >
                    <label htmlFor="" className="pb-4">Choose images to post</label> <br />
                    <input 
                        type="file" 
                        className="w-full mb-4" 
                        onChange={handlePostDataFormInputChange}
                    /> <br />
                    <label htmlFor="" className="pb-4">Add Caption</label> <br />
                    <textarea 
                        type="text" 
                        className="w-full text-black"
                        id="postCaption" 
                        value={postCaption}
                        onChange={handlePostDataFormInputChange}
                    /> <br />
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
