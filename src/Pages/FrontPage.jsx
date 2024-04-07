import { useEffect } from "react";
import home from "../assets/home.png";
import { ImFacebook2 } from "react-icons/im";
import {Link , useNavigate} from "react-router-dom";

const FrontPage = (loggedIn) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn) {
      navigate("/home");
    } 
    // else {
    //   navigate("/");
    // }
  }, [loggedIn, navigate]);
  return (
    <div className="bg-zinc-200 ">
      <div className="h-svh max-w-2xl mx-auto bg-black text-white pb-[23px] flex justify-between items-center">
        <div className="pt-8 hidden md:block">
          <img 
            src={home} 
            alt="" 
            className="h-[600px] w-[500px]"
          />
        </div>

        <div>
          <div className="flex flex-col justify-center mx-10 items-center border p-12">
            <p className="mb-4 text-center font-bold text-2xl">
              instagram
            </p>
            <form>
              <input 
                type="text"
                placeholder="email..." 
                className="p-2 rounded mb-2 w-full mr-4 text-black"
              />
              <input 
                type="password"
                placeholder="password..." 
                className="p-2 rounded w-full px-4 text-black mb-4"
              />
              <div className="flex justify-center items-center">
                <button className="p-2 rounded w-full bg-blue-600">
                  Login
                </button>
              </div>
              <div className="my-4 before:border-t flex before:flex-1 items-center before:border-grey-300  after:border-t  after:flex-1  after:border-grey-300">
                  <p className="mx-4 text-center mb-4">
                  OR
                  </p>
              </div>
              <button className="flex items-center justify-center gap-2 text-blue-400 mb-6">
                <ImFacebook2 />
                <p>
                  Log in with Facebook
                </p>
              </button>
              <div className="flex justify-center items-center">
                <Link to="/forgot-password">
                  Forgot Password?
                </Link>
              </div>
            </form>
            </div>
            <div className="flex justify-center items-center border mx-10 mt-6 p-6">
              <p>
                Don't have an account? 
              </p>
              <Link to="/sign-up" className="ml-2 text-blue-400">Sign Up</Link>
            </div>
        </div>
    </div>
    
    </div>
  )
}

export default FrontPage;