import UserAuthenticationStatus from "../Hooks/UserAuthenticationStatus";
import Loading from "./Loading";
import {Outlet , Navigate} from "react-router-dom"

const PrivateRoute = () => {
    const {loggedIn , checkingStatus} = UserAuthenticationStatus();
    if(checkingStatus) {
        return <Loading />
    }
    return loggedIn ? <Outlet /> : <Navigate to="/sign-up" />
}

export default PrivateRoute