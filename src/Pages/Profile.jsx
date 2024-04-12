import { getAuth } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useState, useSyncExternalStore } from "react";
import { useEffect } from "react";
import { db } from "../firebase";
import { MdOutlineCameraAlt } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import Avatar from '@mui/material/Avatar';
import {useNavigate} from "react-router-dom";
import Loading from "../Components/Loading";
import { FaAngleUp } from "react-icons/fa";
import { FaImages } from "react-icons/fa";
import { LuUserSquare2 } from "react-icons/lu";
import { HiSave } from "react-icons/hi";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const Profile = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    const [users , setUsers] = useState(null);
    const [loading , setLoading] = useState(false);
    const [userPosts , setUserPosts] = useState(null);
    const [showPosts , setShowPosts] = useState(false);
    const [isShowPostsActive , setIsShowPostsActive] = useState(false);
    const [isShowTaggedActive , setIsShowTaggedActive] = useState(false);
    const [isShowSavedActive , setIsShowSavedActive] = useState(false);
    const [linkCopiedText , setLinkCopiedText] = useState(false);
    const [viewSignOut , setViewSignOut] = useState(false);



    const style = {
        position: 'absolute',
        top: '50%',
        left: "50%",
        bottom: "0%",
        transform: 'translate(-50%, -50%)',
        width: "calc(100vw - 80%)",
        maxWidth: '40%',
        height: 'calc(100vh - 80%)',
        overflowY: 'auto',
        bgcolor: "rgb(28 25 23)",
        color: "white",
        border: '2px solid #000',
        boxShadow: 24,
        p: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        '@media (max-width: 768px)': {
            maxWidth: '100%',
            width: "calc(100vw - 50%)",
        },
        '@media (min-width: 769px) and (max-width: 1024px)': {
            maxWidth: '80%',
            height: 'calc(100vh - 85%)',
        },
        '@media (min-width: 1025px) and (max-width: 1280px)': {
            maxWidth: '50%',
        },
    };





    useEffect(() => {
        const fetchUser = async() => {
            try {
                setLoading(true);
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
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    } , []);

    const handleSignOut = (event) => {
        event.preventDefault();
        auth.signOut();
        navigate("/");
    }

        useEffect(() => {
            const fetchUserProfile = async() => {
                const userPostRef = collection(db , "Posts");
                const q = query(userPostRef , where("userRef" , "==" , auth?.currentUser?.uid) , orderBy("timestamp" , "desc"));
                const querySnap = await getDocs(q);
                const userPosts = [];
                querySnap.forEach((doc) => {
                    return (
                        userPosts.push({
                            id: doc.id , 
                            data: doc.data()
                        })
                    )
                });
                setUserPosts(userPosts);
            };
            fetchUserProfile();
        })

        
        
   
    const handleViewPostButton = (event) => {
        event.preventDefault();
        setShowPosts((prevState) => {
            setShowPosts(!prevState);
        });
        setIsShowPostsActive((prevState) => {
            setIsShowPostsActive(!prevState);
        });
        setIsShowSavedActive(false);
        setIsShowTaggedActive(false);
    }

    const handleViewTaggedButton = (event) => {
        event.preventDefault();
        setIsShowTaggedActive((prevState) => {
            setIsShowTaggedActive(!prevState);
        });
        setShowPosts(false);
        setIsShowPostsActive(false);
        setIsShowSavedActive(false);
    }

    const handleViewSavedButton = (event) => {
        event.preventDefault();
        setIsShowSavedActive((prevState) => {
            setIsShowSavedActive(!prevState);
        });
        setShowPosts(false);
        setIsShowPostsActive(false);
        setIsShowTaggedActive(false);
    }

    const handleShareProfile = () => {
        const linkCopied = navigator.clipboard.writeText(window.location.href);
        setLinkCopiedText(true);
        setTimeout(() => {
            setLinkCopiedText(false);
        } , 2000);
    };

    const handleViewSignOut = (event) => {
        setViewSignOut(true);
    }
    
    if(loading) {
        return <Loading />
    }

    return (
        <div className="bg-zinc-200">
            <div className="min-h-lvh bg-black text-white max-w-2xl mx-auto px-4 md:px-40">
                    <nav className="flex justify-between items-center sticky top-0 z-50">
                        <div className="flex items-center gap-2">
                            <div>
                                {users ? (() => {
                                const currentUser = users.find((user) => user.id === auth?.currentUser?.uid);
                                return (
                                    <h1 className="font-semibold text-lg">
                                        {currentUser?.data.userName}
                                    </h1>
                                )
                                })
                                (): (
                                    <h1>
                                        {auth.currentUser.displayName}
                                    </h1>
                                )}
                            </div>
                            <div>
                                <FaAngleDown 
                                    className="font-normal text-xl cursor-pointer"
                                    onClick={handleViewSignOut} 
                                />
                                {viewSignOut && (
                                    <Modal
                                        open={viewSignOut}
                                        onClose={() => setViewSignOut(false)} // Close modal via parent component
                                    >
                                        <Box sx={style}>
                                            <div className="flex flex-col items-center mt-10">
                                                    <button className="border px-10 py-2 rounded" onClick={handleSignOut}>
                                                        sign out
                                                    </button>
                                            </div>
                                        </Box>
                                    </Modal>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <MdOutlineCameraAlt className="font-bold text-3xl" />
                            <FiSend className="font-bold text-3xl" />
                            <IoMdMenu className="font-bold text-3xl" />
                        </div>
                    </nav>
                    <div className="mt-4 flex justify-between items-center">
                        
                        <Avatar 
                            alt="john" 
                            src={users ? (() => {
                                const currentUser = users.find((user) => user.id === auth?.currentUser?.uid);
                                return currentUser?.data.profilePicture;
                            })() : ""} 
                            style={{ width: '6rem', height: '6rem', cursor: 'pointer'}}
                        />
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col items-center">
                                <p>
                                    0
                                </p>
                                <p>
                                    Posts
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p>
                                    20
                                </p>
                                <p>
                                    Followers
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p>
                                    30
                                </p>
                                <p>
                                    Following
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2">
                        {users ? (() => {
                            const currentUser = users.find((user) => user.id === auth?.currentUser?.uid);
                            return (
                                <div>
                                    <h1>{currentUser?.data.fullName}</h1>
                                </div>
                            );
                        })() : (
                            <div>
                                {console.log("error")}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center">
                        {users ? (() => {
                            const currentUser = users.find((user) => user.id === auth?.currentUser?.uid)
                            if(currentUser) {
                                return (
                                    <div className="relative">
                                        <button 
                                            className="px-8 py-1 bg-stone-900 rounded"
                                            onClick={() => navigate("/edit-profile")}
                                        >
                                            Edit profile
                                        </button>
                                        <button 
                                            className="px-8 py-1 bg-stone-900 rounded mx-2"
                                            onClick={handleShareProfile}
                                        >
                                            Share profile
                                        </button>
                                        {linkCopiedText && (
                                            <p className="text-blue-700 absolute bottom-8 left-48 ">
                                                link copied
                                            </p>
                                        )}
                                        <button className="px-2 py-2 bg-stone-900 rounded">
                                            <FaAngleDown />
                                        </button>
                                    </div>
                                );
                            } else {
                                return (
                                    <div>
                                        <button 
                                            className="px-8 py-1 bg-stone-900 rounded"
                                        >
                                            Follow
                                        </button>
                                        <button 
                                            className="px-8 py-1 bg-stone-900 rounded mx-2"
                                            onClick={handleShareProfile}
                                        >
                                            Message
                                        </button>
                                    </div>
                                );
                            }
                        })() : null}
                    </div>

            
                    <div className="flex justify-between mt-4 mx-8">
                        <FaImages 
                            className={`font-bold text-2xl cursor-pointer ${isShowPostsActive ? "border-b-2 pb-1  w-20" : ""}`} 
                            onClick={handleViewPostButton} 
                        />
                        <LuUserSquare2 
                            className={`font-bold text-2xl cursor-pointer ${isShowTaggedActive ? "border-b-2 pb-1  w-20" : ""}`}  
                            onClick={handleViewTaggedButton}
                        />
                        <HiSave 
                            className={`font-bold text-2xl cursor-pointer ${isShowSavedActive ? "border-b-2 pb-1  w-20" : ""}`} 
                            onClick={handleViewSavedButton}
                        />
                    </div>
                    {userPosts?.length == 0 && showPosts && (
                        <div className="mt-6">
                            <h1 className="text-center text-lg font-semibold">
                                Capture the moment with a friend
                            </h1>
                            <p className="text-center text-blue-700" onClick={() => navigate("/post")}>
                                Create your first post
                            </p>
                        </div>
                    )}
                    {userPosts?.length > 0 && showPosts && (
                        <div className="mt-8">
                                {userPosts.map((userPost) => (
                                    <div key={userPost.id} className="pb-4"> 
                                        <div>
                                            {userPost.data.imageUrls.map((imageUrl, index) => ( 
                                                <div key={index}>
                                                    <img 
                                                        key={index}
                                                        src={imageUrl} 
                                                        alt={`Post ${index}`}
                                                        className="w-full h-80"
                                                    />
                                                </div>
                                            ))}
                                         </div>
                                         <div>
                                            <h3>
                                                {userPost.data.postCaption}
                                            </h3>
                                         </div>
                                    </div>
                                    
                                ))}
                        </div>
                    )}

                    

            </div>
            
           
        </div>
      
    );
  };
  
  export default Profile;
  