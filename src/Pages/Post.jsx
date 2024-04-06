import { useState } from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import { getAuth } from "firebase/auth";
import {v4 as uuidv4} from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import {toast} from "react-toastify";
import Loading from "../Components/Loading";

const Post  = () => {
    const auth = getAuth();

    const [postData , setPostData] = useState({
        postImage : "" , 
        postCaption : "" ,
    });
    const {postImage , postCaption} = postData;

    const [loading , setLoading] = useState();

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
    }


    const handlePostDataFormSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const storePostImages = (image) => {
                return new Promise((resolve , reject) => {
                    const storage = getStorage();
                    const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
                    const storageRef = ref(storage , fileName);
                    const uploadTask = uploadBytesResumable(storageRef , image);
                    
                    uploadTask.on("state_changed" ,
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    } , 
                    (error) => {
                        reject(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadORL) => {
                            resolve(downloadORL);
                        })
                    }
                    )
                })
            };

            const imageUrls = await Promise.all(
                [...postImage].map((image) => storePostImages(image))
            ).catch((error) => {
                toast.error("Post Images not uploaded");
                return;
            });

            const postDataCopy = {
                ...postData , 
                imageUrls , 
                timestamp : serverTimestamp() , 
                userRef : auth.currentUser.uid
            };
            delete postDataCopy.postImage;

            const docRef = await addDoc(collection(db , "Posts") , postDataCopy);
            setLoading(false);
            toast.success("Post submitted Successfully");

        } catch (error) {
            toast.error("cant submit your post, please try again");
        }
    }

    if(loading) {
       return <Loading />
    }


    return (
        <div className="bg-zinc-200">
            <div className="h-svh max-w-2xl mx-auto bg-black text-white px-4">
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
                    <form onSubmit={handlePostDataFormSubmit}>
                        <label htmlFor="" className="pb-4">Choose images to post</label> <br />
                        <input 
                            type="file" 
                            className="w-full mb-4" 
                            onChange={handlePostDataFormInputChange}
                        /> <br />
                        <label htmlFor="postCaption" className="pb-4">Add Caption</label> <br />
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
           </div> 
    )
};
export default Post;
