import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { getAuth } from "firebase/auth";
import Avatar from '@mui/material/Avatar';
import Post from "../Pages/Post";
import {useNavigate , useLocation} from "react-router-dom";

const Footer = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const isEditProfilePage = location.pathname === "/edit-profile";
    const isEditNamePage = location.pathname === "/edit-name";
    const isEditUserNamePage = location.pathname === "/edit-userName";
    const isEditBioPage = location.pathname === "/edit-bio";
    return !isEditProfilePage && !isEditNamePage && !isEditUserNamePage && !isEditBioPage ?  (
        <div className="sticky bottom-0 w-full text-white bg-black flex justify-between  px-4 pb-1 max-w-2xl mx-auto">
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
                    src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" 
                    style={{ width: '2rem', height: '2rem'  , cursor: 'pointer'}}
                    
                />
            </div>
           
        </div>
    ) : null;
};

export default Footer;