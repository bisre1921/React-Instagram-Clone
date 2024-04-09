import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { TbLetterX } from "react-icons/tb";
import Avatar from '@mui/material/Avatar';
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import {toast} from "react-toastify"
import { getAuth } from 'firebase/auth';

const CommentModal = ({ open, setOpenComment , postId }) => {

    const [comment , setComment] = useState("");
    const [comments , setComments] = useState([]);
    const auth = getAuth();
    
    const style = {
        position: 'absolute',
        top: '60%', 
        left: "50%",
        bottom: '0%',
        transform: 'translate(-50%, -50%)', 
        width: "100vw",
        maxWidth: '40%',
        height: 'calc(100vh - 20%)' ,
        overflowY: 'auto',
        bgcolor: 'black',
        // bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        
        '@media (max-width: 768px)': {
            maxWidth: '100%', // Adjust maximum width for smaller screens (example: screens up to 768px wide)
        },
        '@media (min-width: 769px) and (max-width: 1024px)': {
            maxWidth: '80%', // Adjust maximum width for screens between 769px and 1024px wide
        },
        '@media (min-width: 1025px) and (max-width: 1280px)': {
            maxWidth: '50%', // Adjust maximum width for screens between 769px and 1024px wide
        },
    };
    

    const handleCloseCommentClick = () => {
        setOpenComment(false);
    };

    const handleCommentInputChange = (event) => {
        setComment(event.target.value);
    };

    const handleCommentSubmit = async(event) => {
        event.preventDefault();
        try {
            const postRef = doc(db , "Posts" , postId);
            const postSnapshot = await getDoc(postRef);

            if(postSnapshot.exists()) {
                const postData = postSnapshot.data();
                const newComments = [...(postData.comments || []), { userName: auth.currentUser.displayName, message: comment }];
                await updateDoc(postRef , {
                    comments : newComments
                });
                setComments(newComments);
                setComment("");
            }
        } catch (error) {
            console.log(error);
        }
        
    };

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const postRef = doc(db, "Posts", postId);
                const postSnapshot = await getDoc(postRef);
    
                if (postSnapshot.exists()) {
                    const postData = postSnapshot.data();
                    if (postData.comments) {
                        setComments(postData.comments);
                    }
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        fetchComments();
    }, [postId]);
    

    return (
        <div className="max-w-2xl text-white">
            <Modal
                open={open}
                onClose={() => setOpenComment(false)} // Close modal via parent component
            >
                <Box sx={style}>
                    <div className='text-white'>
                        <nav className='flex items-center gap-2 bg-stone-800 p-3 sticky top-0 z-50'>
                            <TbLetterX className='cursor-pointer' onClick={handleCloseCommentClick} />
                            <h3>Comments</h3>
                        </nav>
                        <div className='mx-4 mt-2'>
                            {comments.map((comment, index) => (
                                <div key={index} className='flex gap-3 mb-3'>
                                    <div>
                                        <Avatar alt="user" src="" />
                                    </div>
                                    <div className=''>
                                        <h1 >
                                            <span className='font-semibold mr-2'>
                                                {comment.userName} {/* Display user who made the comment */}
                                            </span>
                                            12h {/* Assuming comment timestamp */}
                                        </h1>
                                        <p>{comment.message}</p> {/* Display comment text */}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='sticky bottom-0 mt-4'>
                            <form onSubmit={handleCommentSubmit} className='flex items-center gap-4'>
                                <div>
                                    <Avatar alt="user" src="" />
                                </div>
                                <div className='flex-1 mr-2'>
                                    <input 
                                        type="text" 
                                        placeholder='Add a comment...'
                                        value={comment}
                                        onChange={handleCommentInputChange}
                                        className='w-full px-2 py-2 bg-stone-800' 
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <button onClick={handleCloseCommentClick}>Close</button>
                </Box>
            </Modal>
        </div>
    );
};

export default CommentModal;
