import {useAuth0} from "@auth0/auth0-react";
import {Navigate} from "react-router-dom";
import Navigation from "../components/Navigation.jsx";
import FormProfile from "../components/FormProfile.jsx";
import {Divider} from "@nextui-org/react";
import Footer from "../components/Footer.jsx";

function Profile() {
    const {user, isAuthenticated, isLoading} = useAuth0();

    if (!isAuthenticated && !isLoading) {
        return <Navigate to="/"/>;
    }

    return (
        <>
            <Navigation/>
            <Divider/>
            <FormProfile usuario={user}/>
            <Footer/>
        </>
    );
}

export default Profile;