import {BrowserRouter as Router , Routes , Route} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ForgotPassword from "./Pages/ForgotPassword";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FrontPage from "./Pages/FrontPage";
import Home from "./Pages/Home";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Post from "./Pages/Post";
import Profile from "./Pages/Profile";
import PrivateRoute from "./Components/PrivateRoute";
import EditProfile from "./Pages/EditProfile";
import Moment from 'react-moment';
import 'moment-timezone';

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
          <Route path="/" element={<FrontPage loggedIn={loggedIn} />} />
          <Route path="/home" element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/sign-up" element={<SignUp loggedIn={loggedIn} />} />
          <Route path="/sign-in" element={<SignIn loggedIn={loggedIn} />} />
          <Route path="/post" element={<PrivateRoute />}>
            <Route path="/post" element={<Post />} />
          </Route>
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/edit-profile" element={<PrivateRoute />}>
            <Route path="/edit-profile" element={<EditProfile />} />
          </Route>
          
        </Routes>
        {loggedIn && (
          <Footer />
        )}
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