import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { getAuth } from "firebase/auth";
import Avatar from '@mui/material/Avatar';
import Post from "../Pages/Post";
import {useNavigate} from "react-router-dom";

const Footer = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    return (
        <div className="sticky bottom-0 w-full text-white bg-black flex justify-between  px-4 pb-1 max-w-2xl mx-auto">
            <IoMdHome className="font-bold text-3xl" />
            <FaSearch className="font-bold text-3xl" />
            <FaRegPlusSquare 
                className="font-bold text-3xl" 
                onClick={ () => navigate("/post") }
            />
            <MdOutlineOndemandVideo className="font-bold text-3xl" />
            <Avatar 
                alt="john" 
                src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" 
                style={{ width: '2rem', height: '2rem' }}
            />
        </div>
    )
};

export default Footer;