import { ImFacebook2 } from "react-icons/im";
import { Link , useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {toast} from "react-toastify";
import Loading from "../Components/Loading";

const SignIn = () => {

  const [signInFormData , setSignInFormData] = useState({
    email : "" ,
    password : "" ,
  });
  const {email , password} = signInFormData;

  const [loading , setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignInFormInputChange = (event) => {
    setSignInFormData((prevState) => ({
      ...prevState , 
      [event.target.id] : event.target.value
  }));
  };

  const handleSignInFormSubmit = async(event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if(userCredential.user) {
        navigate("/home");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Invalid email or password. Please check your credentials and try again.")
    }
  }

  if(loading) {
    <Loading />
  }
  return (
    <div className="bg-zinc-200 ">
      <div className=" flex flex-col justify-start items-center h-svh pt-20  max-w-2xl mx-auto bg-black text-white pb-32 md:pb-10">
        <div className="max-w-md w-[300px] border p-4 flex flex-col items-center justify-start mx-8">
          <h1 className="mb-10">Instagram</h1>
          <form onSubmit={handleSignInFormSubmit}>
            <input
              type="text"
              placeholder="email..."
              id="email"
              onChange={handleSignInFormInputChange}
              className="p-2 rounded mb-2 w-full mr-4 text-black"
            />
            <input
              type="password"
              placeholder="password..."
              id="password"
              onChange={handleSignInFormInputChange}
              className="p-2 rounded w-full mr-4 text-black mb-6"
            />
            <div>
              <button className="p-2 rounded w-full mr-4 bg-blue-600 mb-4">
                Log in
              </button>
            </div>
            <div className="flex items-center justify-center w-full">
              <div className="border-t border-gray-300 w-full my-4"></div>
              <p className="mx-4 text-center mb-4">OR</p>
              <div className="border-t border-gray-300 w-full my-4"></div>
          </div>
          <button className="p-2 rounded w-full bg-blue-600 flex items-center justify-center gap-2 mb-6 mt-6">
            <ImFacebook2 />
            <p>Log in with Facebook</p>
          </button>
          <div className="flex justify-center items-center">
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </div>
          </form>
        </div>
        <div className="w-[300px] flex justify-center items-center border mx-10 mt-6 p-6">
              <p>
                Don't have an account? 
              </p>
              <Link to="/sign-up" className="ml-2 text-blue-400">Sign Up</Link>
            </div>
      </div>
    </div>
  );
};

export default SignIn;
