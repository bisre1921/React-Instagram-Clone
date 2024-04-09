import { TbLetterX } from "react-icons/tb";
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Loading from "../Components/Loading";

const EditProfile = () => {
    const auth = getAuth();

    const [editProfileFormData , setEditProfileFormData] = useState({
        name : "" , 
        userName : "" , 
        bio : "" , 
    });

    const [loading , setLoading] = useState(false);

    const {name , userName , bio} = editProfileFormData;
    useEffect(() => {
        const fetchUserData = async() => {
            setLoading(true);
            const postRef =doc(db , "Users" , auth.currentUser.uid);
            const postSnapshot = await getDoc(postRef);
            const userData = postSnapshot.data();
            setEditProfileFormData({
                name : userData.fullName , 
                userName : userData.userName , 
                bio : userData.bio
            })
            console.log(postSnapshot.data())
            
        setLoading(false);
        };
        fetchUserData();
    } , []);


 if(loading) {
    return <Loading />
 }
  return (
    <div className="bg-black h-lvh text-white">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <TbLetterX />
                <h3>
                    Edit profile
                </h3>
            </div>
            <div>
                <p className="text-blue-700">
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
            <form action="">
                <label htmlFor="">Name</label> <br />
                <input 
                    type="text" 
                    value={name}
                    className="mb-2 w-full border rounded bg-black px-2 py-1"
                />  <br />
                <label htmlFor="">Username</label> <br />
                <input 
                    type="text"
                    value={userName}
                    className="mb-2 w-full border rounded bg-black px-2 py-1" 
                /> <br />
                <label htmlFor="">Bio</label> <br />
                <input 
                    type="text" 
                    value={bio}
                    className="mb-2 w-full border rounded bg-black px-2 py-1"
                /> <br />
            </form>
        </div>
    </div>
  )
}

export default EditProfile