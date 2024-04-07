import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const UserAuthenticationStatus = () => {
    const [loggedIn , setLoggedIn] = useState(false);
    const [checkingStatus , setCheckingStatus] = useState(true);

    useEffect(() => {
        const auth  = getAuth();
        onAuthStateChanged(auth , (user) => {
            if(user) {
                setLoggedIn(true);
            } 
            setCheckingStatus(false);
        })
    } , [])
  return {loggedIn , checkingStatus};
}

export default UserAuthenticationStatus