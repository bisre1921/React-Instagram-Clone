import Avatar from '@mui/material/Avatar';
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import {toast} from "react-toastify"
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import CommentModal from '../Components/CommentModal';
import { getAuth } from 'firebase/auth';

const Home = () => {
    const [posts , setPosts] = useState(null);
    const [users , setUsers] = useState(null);
    const [likedPosts, setLikedPosts] = useState({});
    const [likedCount , setLikedCount] = useState(0);
    const [openComment , setOpenComment] = useState({ postId: null, isOpen: false });
    const auth = getAuth();

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const userRef = collection(db , "Users");
                const querySnap = await getDocs(userRef);
                const usersData = [];
                querySnap.forEach((doc) => {
                    usersData.push({
                        id:doc.id ,
                        data: doc.data()
                    });
                });
                setUsers(usersData);
            } catch (error) {
                console.log(error);
            }
        }
        const fetchPost = async() => {
            try {
                const postsRef = collection(db, "Posts");
                const querySnap = await getDocs(postsRef);
                const postsData = [];
                querySnap.forEach((doc) => {
                    postsData.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                postsData.sort((a, b) => b.data.timestamp - a.data.timestamp);
                setPosts(postsData);
            } catch (error) {
                toast.error("Error Fetching Posts");
                console.log(error);
            }
        }
        
        fetchUser();
        fetchPost();
    } , []);

    const handleLikeClick = async (postId) => {
        try {
            setLikedPosts((prevLikedPosts) => ({
                ...prevLikedPosts,
                [postId]: !prevLikedPosts[postId],
            }));
            // const updatedLikedPosts = { ...likedPosts };
            // updatedLikedPosts[postId] = !updatedLikedPosts[postId];
            // setLikedPosts(updatedLikedPosts);
    
            const postRef = doc(db, 'Posts', postId);
            const postSnapshot = await getDoc(postRef);
            if (postSnapshot.exists()) {
                const postData = postSnapshot.data();
                const updatedLikes = likedPosts[postId] ? postData.likes - 1 : postData.likes + 1;
    
                await updateDoc(postRef, {
                    likes: updatedLikes,
                });

                setLikedCount((prevLikedCount) => ({
                    ...prevLikedCount,
                    [postId]: updatedLikes,
                }));
    
            } else {
            }
        } catch (error) {
            console.error('Error updating like:', error);
            toast.error('Failed to update like. Please try again.');
        }
    };
    
    useEffect(() => {
        const fetchUserLikedPosts = async () => {
            try {
                const postsRef = collection(db, 'Posts');
                const postsSnapshot = await getDocs(postsRef);
                
                const userLikedPosts = {};
                const updatedLikedCount = {};
    
                postsSnapshot.forEach((doc) => {
                    const postData = doc.data();
                    updatedLikedCount[doc.id] = postData.likes;
                    
                    if (postData.likes && postData.likes[auth.currentUser.uid]) {
                        userLikedPosts[doc.id] = true;
                    }
                });
    
                setLikedPosts(userLikedPosts);
                setLikedCount(updatedLikedCount);
            } catch (error) {
                console.error('Error fetching user liked posts:', error);
                toast.error('Failed to fetch liked posts. Please try again.');
            }
        };
    
        fetchUserLikedPosts();
    }, [auth.currentUser]);
    
    
   

   
    const handleOpenCommentClick = (postId) => {
        setOpenComment({ postId, isOpen: true });
    };
    
    return (
        <div className="bg-zinc-200">
            <div className="max-w-2xl mx-auto pt-10 bg-black text-white h-fit">
                {posts ? (
                    posts.map((post) => {
                        const user = users.find((user) => user.id === post.data.userRef);
                        return (
                            <div key={post.id} className="pb-6">
                                <div className="flex justify-between pb-2">
                                    <div className="flex items-center gap-2 pl-4">
                                        <Avatar alt={user.data.userName} src={user.data.profilePicture} />
                                        <h3>{user.data.userName}</h3>
                                    </div>
                                    <div className="flex items-center gap-2 pr-4">
                                        <h3>12h</h3>
                                        <h3><BsThreeDotsVertical /></h3>
                                    </div>
                                </div>
                                <div>
                                    <img 
                                        src={post.data.imageUrls}
                                        alt="post image" 
                                        className="h-80 w-full"
                                    />
                                </div>
                                <div className="flex gap-3 pt-2 pl-4">
                                    {likedPosts[post.id] ? (
                                        <FaHeart 
                                            className="font-bold text-xl text-red-700 cursor-pointer" 
                                            onClick={() => handleLikeClick(post.id)}
                                        />
                                    ) : (
                                        <IoMdHeartEmpty 
                                            className={`font-bold text-xl cursor-pointer`}
                                            onClick={() => handleLikeClick(post.id)}
                                        />
                                    )}
                                    
                                    <FaRegComment 
                                        className="font-bold text-xl cursor-pointer"
                                        onClick={() => handleOpenCommentClick(post.id)} 
                                    />
                                    {openComment.isOpen && openComment.postId === post.id && <CommentModal open={true} setOpenComment={setOpenComment} />}
                                </div>
                                <div className='mx-4'>
                                    {likedCount[post.id] && (
                                        <h1>
                                            {likedCount[post.id]} {likedCount[post.id] > 1 ? "likes" : "like"}
                                        </h1>
                                    )}
                                    
                                </div>
                                <div className="pl-4">
                                    <h2 className="">
                                        <span className="font-semibold pr-1">{user.data.userName}</span> 
                                        {post.data.postCaption}
                                    </h2>
                                    <p className="text-gray-300">
                                        view all comments
                                    </p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div>{console.log("no post")}</div>
                )}
            </div>
        </div>
    );
}

export default Home;
