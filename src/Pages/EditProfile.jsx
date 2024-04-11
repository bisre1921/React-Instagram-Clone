import { TbLetterX } from "react-icons/tb";
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Loading from "../Components/Loading";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const EditProfile = (props) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [editProfileFormData, setEditProfileFormData] = useState({
        fullName: "",
        userName: "",
        bio: "",
        profilePicture: null,
    });

    const [loading, setLoading] = useState(false);
    const [viewFileUploadForm, setViewFileUploadForm] = useState(false);

    const { fullName, userName, bio, profilePicture } = editProfileFormData;

    const style = {
        position: 'absolute',
        top: '50%',
        left: "50%",
        bottom: "0%",
        transform: 'translate(-50%, -50%)',
        width: "100vw",
        maxWidth: '40%',
        height: 'calc(100vh - 70%)',
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
        },
        '@media (min-width: 769px) and (max-width: 1024px)': {
            maxWidth: '80%',
        },
        '@media (min-width: 1025px) and (max-width: 1280px)': {
            maxWidth: '50%',
        },
    };

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            const postRef = doc(db, "Users", auth.currentUser.uid);
            const postSnapshot = await getDoc(postRef);
            const userData = postSnapshot.data();
            setEditProfileFormData({
                fullName: userData.fullName,
                userName: userData.userName,
                bio: userData.bio,
                profilePicture: userData.profilePicture // Assuming profile picture URL is stored in the database
            })
            setLoading(false);
        };
        fetchUserData();
    }, []);

    const handleEditFormInputChange = (event) => {
        if (event.target.files) {
            setEditProfileFormData((prevState) => ({
                ...prevState,
                profilePicture: event.target.files[0]
            }))
        }
        else {
            setEditProfileFormData((prevState) => ({
                ...prevState,
                [event.target.id]: event.target.value
            }))
        }
    }

    const handleEditFormSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const docRef = doc(db, "Users", auth.currentUser.uid);
            await updateDoc(docRef, editProfileFormData);
            toast.success("Profile edited successfully");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to edit profile");
        } finally {
            setLoading(false);
        }
    };
    

    const handleUploadProfilePicture = async () => {
        try {
            if (!profilePicture) {
                toast.error("Please select a profile picture to upload");
                return;
            }
            setLoading(true);
            const storage = getStorage();
            const fileName = `${auth.currentUser.uid}-${profilePicture.name}-${uuidv4()}`;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, profilePicture);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                },
                (error) => {
                    console.error("Error uploading profile picture:", error);
                    toast.error("Failed to upload profile picture");
                    setLoading(false);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setEditProfileFormData((prevState) => ({
                            ...prevState,
                            profilePicture: downloadURL,
                        }));
                        toast.success("Profile picture uploaded successfully");
                        setLoading(false);
                    });
                }
            );
            setViewFileUploadForm(false);
        } catch (error) {
            console.error("Error uploading profile picture:", error);
            toast.error("Failed to upload profile picture");
            setLoading(false);
        }
    };

    const handleViewFileUploadForm = (event) => {
        setViewFileUploadForm(true);
    };

    if (loading) {
        return <Loading />
    }

    return (
        <div className="bg-black h-lvh text-white max-w-2xl mx-auto md:px-40">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <TbLetterX className="cursor-pointer" onClick={() => navigate("/profile")} />
                    <h3>
                        Edit profile
                    </h3>
                </div>
                <div>
                    <p className="text-blue-700 cursor-pointer" onClick={handleEditFormSubmit}>
                        Done
                    </p>
                </div>
            </div>
            <div
                className="flex justify-center mt-4 cursor-pointer"
                onClick={handleViewFileUploadForm}
            >
                <div className="flex flex-col items-center">
                    <Avatar
                        alt=""
                        src={profilePicture} // Display current profile picture if available
                        style={{ width: '4rem', height: '4rem' }}
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
                        {viewFileUploadForm && (
                            <Modal
                                open={viewFileUploadForm}
                                onClose={() => setViewFileUploadForm(false)} // Close modal via parent component
                            >
                                <Box sx={style}>
                                    <div className="flex flex-col items-center mt-10">
                                        <input
                                            type="file"
                                            onChange={handleEditFormInputChange}
                                        />
                                        <button
                                            className="mt-4"
                                            onClick={handleUploadProfilePicture}
                                            disabled={loading}
                                        >
                                            Add Profile Picture
                                        </button>
                                    </div>
                                </Box>
                            </Modal>
                        )}
                    </form>
                </div>
            </div>
        );
    }
    
    export default EditProfile;
    
