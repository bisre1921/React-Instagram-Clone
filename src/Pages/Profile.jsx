import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
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

const Profile = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    const [users , setUsers] = useState(null);
    const [loading , setLoading] = useState(false);

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
    
    if(loading) {
        return <Loading />
    }

    return (
        <div className="bg-zinc-200">
            <div className="h-lvh bg-black text-white max-w-2xl mx-auto px-4 md:px-40">
                    <nav className="flex justify-between items-center sticky top-0 z-50">
                        <div className="flex items-center gap-2">
                            <div>
                                <h1 className="font-semibold text-lg">
                                   {auth?.currentUser?.displayName}
                                </h1>
                            </div>
                            <div>
                                <FaAngleDown className="font-normal text-xl" />
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
                            src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" 
                            style={{ width: '6rem', height: '6rem'  , cursor: 'pointer'}}
                            
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
                            // Find the current user once
                            const currentUser = users.find((user) => user.id === auth?.currentUser?.uid);
                            // Return JSX after finding the current user
                            return (
                                <div>
                                    {/* Render the current user's information */}
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
                        <button className="px-8 py-1 bg-stone-900 rounded">
                            Edit profile
                        </button>
                        <button className="px-8 py-1 bg-stone-900 rounded mx-2">
                            Share profile
                        </button>
                        <button className="px-2 py-2 bg-stone-900 rounded">
                            <FaAngleUp />
                        </button>

                    </div>
            
                    <div className="flex justify-between mt-4 mx-8">
                        <FaImages className="font-bold text-2xl" />
                        <LuUserSquare2 className="font-bold text-2xl" />
                        <HiSave className="font-bold text-2xl" />
                    </div>


                    <div>
                        <button onClick={handleSignOut}>
                            sign out
                        </button>
                    </div>

            </div>
            
           
        </div>
      
    );
  };
  
  export default Profile;
  