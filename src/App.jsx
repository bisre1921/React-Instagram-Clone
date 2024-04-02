import {BrowserRouter as Router , Routes , Route} from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import ForgotPassword from "./Pages/ForgotPassword";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const  App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
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