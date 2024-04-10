import {Link , useLocation} from "react-router-dom";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import { getAuth } from "firebase/auth";
import { MdOutlineCameraAlt } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { FiSend } from "react-icons/fi";
import logo from "../assets/logo.png";

const Navbar = ({loggedIn}) => {
    const auth = getAuth();
    const location = useLocation();
    const isProfilePage = location.pathname === "/profile";
    const isEditProfilePage = location.pathname === "/edit-profile";
    const isEditNamePage = location.pathname === "/edit-name";
    const isEditUserNamePage = location.pathname === "/edit-userName";
    const isEditBioPage = location.pathname === "/edit-bio";
  return !isProfilePage && !isEditProfilePage && !isEditNamePage && !isEditUserNamePage && !isEditBioPage ? (
    <div className="sticky top-0 z-50 bg-zinc-200 text-white">
        <nav className="max-w-2xl bg-black mx-auto flex justify-between items-center px-4">
            <div>
                <Link to="/">
                    <img 
                        src={logo}
                        alt="instagram logo" 
                        className="w-24 h-12"
                    />
                </Link>
            </div>
            <div>
                {loggedIn ? (
                    <ul className="flex gap-4 items-center">
                        {/* <li>
                            {auth.currentUser.displayName}
                        </li> */}
                        <li>
                            <MdOutlineCameraAlt className="font-bold text-3xl" />
                        </li>
                        <li>
                            <IoMdHeartEmpty className="font-bold text-3xl" />
                        </li>
                        <li>
                            <FiSend className="font-bold text-3xl" />
                        </li>
                    </ul>
                ) : (
                    <ul className="flex gap-8">
                        <Link to="/sign-in" element={<SignIn />}>
                            <li className="cursor-pointer">
                                Sign In
                            </li>
                        </Link>
                        <Link to="/sign-up" element={<SignUp />}>
                            <li className="cursor-pointer">
                                Sign Up
                            </li>
                        </Link>
                    </ul>
                )}
                
            </div> 
        </nav>
    </div>
    
  ) : null;
}

export default Navbar