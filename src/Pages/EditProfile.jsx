import { TbLetterX } from "react-icons/tb";
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Loading from "../Components/Loading";
import {useNavigate , useLocation} from "react-router-dom";
import {toast} from "react-toastify";

const EditProfile = (props) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [editProfileFormData , setEditProfileFormData] = useState({
        fullName : "" , 
        userName : "" , 
        bio : "" , 
    });

    const [loading , setLoading] = useState(false);

    const {fullName , userName , bio} = editProfileFormData;
    useEffect(() => {
        const fetchUserData = async() => {
            setLoading(true);
            const postRef =doc(db , "Users" , auth.currentUser.uid);
            const postSnapshot = await getDoc(postRef);
            const userData = postSnapshot.data();
            setEditProfileFormData({
                fullName : userData.fullName , 
                userName : userData.userName , 
                bio : userData.bio
            })
            
        setLoading(false);
        };
        fetchUserData();
    } , []);


    const handleEditFormInputChange = (event) => {
        setEditProfileFormData((prevState) => ({
            ...prevState , 
            [event.target.id] : event.target.value
        }))
    }

    

    const handleEditFormSubmit = async(event) => {
        event.preventDefault();
        const docRef = doc(db , "Users" , auth.currentUser.uid);
        await updateDoc(docRef , editProfileFormData);
        toast.success("Profile edited successfully");
    }


    
 if(loading) {
    return <Loading />
 }
  return (
    <div className="bg-black h-lvh text-white max-w-2xl mx-auto md:px-40">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <TbLetterX />
                <h3>
                    Edit profile
                </h3>
            </div>
            <div>
                <p className="text-blue-700" onClick={handleEditFormSubmit}>
                    Done
                </p>
            </div>
        </div>
        <div className="flex justify-center mt-4">
            <div className="flex flex-col items-center">
                <Avatar 
                    alt="" 
                    src=""  
                    style={{ width: '4rem', height: '4rem'}}
                />
                <p className="mt-2 text-blue-700">
                    Edit picture
                </p>
            </div>
        </div>
        <div className="mx-4">
            <form id="editProfileForm" onSubmit={handleEditFormSubmit}>
                <label htmlFor="">Name</label> <br />
                <input 
                    type="text" 
                    value={fullName}
                    id="fullName"
                    onChange={handleEditFormInputChange}
                    className="mb-2 w-full border rounded bg-black px-2 py-1"
                />  <br />
                <label htmlFor="">Username</label> <br />
                <input 
                    type="text"
                    value={userName}
                    id="userName"
                    onChange={handleEditFormInputChange}
                    className="mb-2 w-full border rounded bg-black px-2 py-1" 
                /> <br />
                <label htmlFor="">Bio</label> <br />
                <input 
                    type="text" 
                    value={bio}
                    id="bio"
                    onChange={handleEditFormInputChange}
                    className="mb-2 w-full border rounded bg-black px-2 py-1"
                /> <br />
            </form>
        </div>
    </div>
  )
}

export default EditProfile