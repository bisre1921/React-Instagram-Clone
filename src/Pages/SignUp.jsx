import { useEffect, useState } from "react";
import { ImFacebook2 } from "react-icons/im";
import { Link , useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import {toast} from "react-toastify";
import Loading from "../Components/Loading";

const SignUp = ({loggedIn}) => {
  const [signUpFormData , setSignUpFormData] = useState({
    email : "" , 
    fullName : "" , 
    userName : "" ,
    password : "" ,
  });
  const {email , fullName , userName , password} = signUpFormData;

  const [loading , setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUpFormInputChange = (event) => {
    setSignUpFormData((prevState) => ({
      ...prevState , 
      [event.target.id] : event.target.value
  }));
  };


  const handleSignUpFormSubmit = async(event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const auth = getAuth();
      const userCredential =  await createUserWithEmailAndPassword(auth , email , password);
      updateProfile(auth.currentUser , {
        displayName : userName
      })
      console.log(userCredential);
      const user = userCredential.user;
      const signUpFormDataCopy = {...signUpFormData};
      delete signUpFormDataCopy.password;
      signUpFormDataCopy.timestamp = serverTimestamp();
      const docRef = doc(db , "Users" , user.uid);
      await setDoc(docRef , signUpFormDataCopy);
      setLoading(false);
      toast.success("User created successfully");
      navigate("/home");
    } catch (error) {
      toast.error("Error creating user. please try again");
    }
  }

  useEffect(() => {
    if (loggedIn) {
      navigate("/home");
    }
  }, [loggedIn, navigate]);
 
  if(loading) {
     return <Loading />
  } 
    return (
      <div className="bg-zinc-200 ">
        <div className=" flex flex-col justify-start items-center pt-10  max-w-2xl mx-auto bg-black text-white pb-32 md:pb-10">
          <div className="max-w-md w-[300px] border p-4 flex flex-col items-center justify-start mx-8">
            <h1>Instagram</h1>
            <p className="text-center">
              Sign up to see photos and videos from your friends.
            </p>
            <button className="p-2 rounded w-full bg-blue-600 flex items-center justify-center gap-2 mb-6 mt-6">
              <ImFacebook2 />
              <p>Log in with Facebook</p>
            </button>
            <div className="flex items-center justify-center w-full">
              <div className="border-t border-gray-300 w-full my-4"></div>
              <p className="mx-4 text-center mb-4">OR</p>
              <div className="border-t border-gray-300 w-full my-4"></div>
            </div>
            <form onSubmit={handleSignUpFormSubmit}>
              <input
                type="text"
                placeholder="email..."
                id="email"
                value={email}
                onChange={handleSignUpFormInputChange}
                className="p-2 rounded mb-2 w-full mr-4 text-black"
              />
              <input
                type="text"
                placeholder="Full Name..."
                id="fullName"
                value={fullName}
                onChange={handleSignUpFormInputChange}
                className="p-2 rounded mb-2 w-full mr-4 text-black"
              />
              <input
                type="text"
                placeholder="Username..."
                id="userName"
                value={userName}
                onChange={handleSignUpFormInputChange}
                className="p-2 rounded mb-2 w-full mr-4 text-black"
              />
              <input
                type="password"
                placeholder="password..."
                id="password"
                value={password}
                onChange={handleSignUpFormInputChange}
                className="p-2 rounded w-full mr-4 text-black mb-6"
              />
              <div className="flex items-center justify-center">
                <p className="text-center mb-6">
                By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .
                </p>
              </div>
              <div>
                <button className="p-2 rounded w-full mr-4 bg-blue-600">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
          <div className="w-[300px] flex justify-center items-center border mt-6 p-6">
            <p>
              have an account? 
            </p>
            <Link to="/sign-in" className="ml-2 text-blue-400">Log in</Link>
          </div>
        </div>
      </div>
    );
  
};


export default SignUp;
