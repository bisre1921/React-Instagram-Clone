import {BrowserRouter as Router , Routes , Route} from "react-router-dom";
import Navbar from "./Components/Navbar";
import ForgotPassword from "./Pages/ForgotPassword";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FrontPage from "./Pages/FrontPage";
import Home from "./Pages/Home";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const  App = () => {
  const auth = getAuth();
  const [loggedIn , setLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth , (user) => {
      if(user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    })
  } , []);

  return (
    <div>
      <Router>
        <Navbar loggedIn={loggedIn} />
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
};
export default App;