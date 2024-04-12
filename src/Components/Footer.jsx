import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { getAuth } from "firebase/auth";
import Avatar from '@mui/material/Avatar';
import Post from "../Pages/Post";
import {useNavigate , useLocation} from "react-router-dom";
import { useEffect, useRef } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

const Footer = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [profilePicture , setProfilePicture] = useState("");
    const isEditProfilePage = location.pathname === "/edit-profile";
    const isHomePage = location.pathname === "/home";


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const docRef = doc(db, "Users", auth?.currentUser?.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setProfilePicture(userData.profilePicture);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUser();
    })

    
    return !isEditProfilePage ?  (
        <div className={`sticky bottom-0 w-full text-white bg-black flex justify-between  px-4 pb-1 max-w-2xl mx-auto ${isHomePage ? "md:px-0" : "md:px-40"}`}>
            <IoMdHome 
                className="font-bold text-3xl cursor-pointer" 
                onClick={() => navigate("/home")}
            />
            <FaSearch className="font-bold text-3xl cursor-pointer" />
            <FaRegPlusSquare 
                className="font-bold text-3xl cursor-pointer" 
                onClick={ () => navigate("/post") }
            />
            <MdOutlineOndemandVideo className="font-bold text-3xl cursor-pointer" />
            <div onClick={() => navigate("/profile")}>
                <Avatar 
                    alt="john" 
                    src={profilePicture} 
                    style={{ width: '2rem', height: '2rem'  , cursor: 'pointer'}}
                    
                />
            </div>
           
        </div>
    ) : null;
};

export default Footer;