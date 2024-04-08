import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { TbLetterX } from "react-icons/tb";
import Avatar from '@mui/material/Avatar';

const CommentModal = ({ open, setOpenComment }) => {
    
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
                            <div className='flex gap-3 mb-3'>
                                <div>
                                    <Avatar alt="leroy name" src="https://www.shutterstock.com/image-photo/young-handsome-man-beard-wearing-260nw-1768126784.jpg" />
                                </div>
                                <div className=''>
                                    <h1 >
                                        <span className='font-semibold mr-2'>leroy__sane</span>
                                        12h
                                    </h1>
                                    <p>
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos, cupiditate fuga dolor unde blanditiis hic non natus, voluptates magni, officia tempore harum voluptatibus facere! Praesentium sequi quam tenetur molestias corrupti.
                                    </p>
                                </div>
                            </div>
                            <div className='flex gap-3 mb-3'>
                                <div>
                                    <Avatar alt="leroy name" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLAVy-V_Mdw0z3wFiwsczxQVaCFM4lmjt8vM9aW6LxYx8Qq9FkaoMgFepEb-erQpJXms4&usqp=CAU" />
                                </div>
                                <div className=''>
                                    <h1 >
                                        <span className='font-semibold mr-2'>albert_deniz</span>
                                        18h
                                    </h1>
                                    <p>
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos, cupiditate fuga dolor unde blanditiis hic non natus, voluptates magni, officia tempore harum voluptatibus facere! Praesentium sequi quam tenetur molestias corrupti.
                                    </p>
                                </div>
                            </div>
                            <div className='flex gap-3'>
                                <div>
                                    <Avatar alt="leroy name" src="https://www.shutterstock.com/image-photo/positive-happy-young-woman-wearing-260nw-1835831287.jpg" />
                                </div>
                                <div className=''>
                                    <h1 >
                                        <span className='font-semibold mr-2'>taylor_zahra</span>
                                        23h
                                    </h1>
                                    <p>
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos, cupiditate fuga dolor unde blanditiis hic non natus, voluptates magni, officia tempore harum voluptatibus facere! Praesentium sequi quam tenetur molestias corrupti.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='sticky bottom-0 mt-4'>
                            <form action="" className='flex items-center gap-4'>
                                <div>
                                    <Avatar alt="user" src="" />
                                </div>
                                <div className='flex-1 mr-2'>
                                    <input 
                                        type="text" 
                                        placeholder='Add a comment...'
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
