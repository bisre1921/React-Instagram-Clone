import { Link } from "react-router-dom"
import { ImFacebook2 } from "react-icons/im";
import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import {toast} from "react-toastify";

const ForgotPassword = () => {
  const [email , setEmail] = useState("");
  const handleFormInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFormSubmit = async(event) => {
    event.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth , email);
      toast.success("Password reset email sent successfully. Please check your inbox.");
      
    } catch (error) {
      toast.error("Failed to send password reset email. Please check your email and try again.")
    }
    console.log(email)
}


  return (
    <div className="max-w-2xl mx-auto bg-black text-white min-h-lvh flex flex-col items-center justify-center">
      <form onSubmit={handleFormSubmit}>
        <div className="max-w-md w-[300px] border p-4 flex flex-col items-center justify-start mx-8">
            <input 
              type="email" 
              placeholder="email..."
              onChange={handleFormInputChange}
              className="p-2 rounded mb-2 w-full mr-4 text-black"
            />
        </div>
        <div>
            <button className="w-[300px] px-6 py-2 rounded  mx-10 mt-6 bg-stone-900 mb-4">
                  Send Reset Password
            </button>
        </div>
      </form>
      <div className="w-[300px] flex justify-center items-center border mx-10 mt-6 p-6 mb-4">
              <p>
                Don't have an account? 
              </p>
              <Link to="/sign-up" className="ml-2 text-blue-400">Sign Up</Link>
        </div>
        <div>
          <Link className="text-blue-700" to="/sign-in">
            Sign In instead
          </Link>
        </div>
        
        <div className="w-[300px] flex items-center justify-center ">
              <div className="border-t border-gray-300 w-full my-4"></div>
              <p className="mx-4 text-center mb-4">OR</p>
              <div className="border-t border-gray-300 w-full my-4"></div>
          </div>
          <button className="w-[300px] px-6 py-2 rounded  bg-blue-600 flex items-center justify-center gap-2 mb-6 mt-6">
            <ImFacebook2 />
            <p>Log in with Facebook</p>
          </button>
    </div>
  )
}

export default ForgotPassword