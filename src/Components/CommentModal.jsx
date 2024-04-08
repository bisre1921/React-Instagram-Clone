import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useState } from 'react';

const CommentModal = ({ open, setOpenComment }) => {
    
    const style = {
        position: 'absolute',
        top: '60%', 
        left: "50%",
        bottom: '0%',
        transform: 'translate(-50%, -50%)', 
        width: "100vw",
        maxWidth: '40%',
        height: 'calc(100vh - 50%)' ,
        overflowY: 'auto',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: 10,
        
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
        <div className="max-w-2xl">
            <Modal
                open={open}
                onClose={() => setOpenComment(false)} // Close modal via parent component
            >
                <Box sx={style}>
                    <h1>
                        hello
                    </h1>
                    <button onClick={handleCloseCommentClick}>Close</button>
                </Box>
            </Modal>
        </div>
    );
};

export default CommentModal;
