import {useEffect} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import Navigation from "../components/Navigation.jsx";
import {Divider} from "@nextui-org/react";
import Footer from "../components/Footer.jsx";
import {Navigate} from "react-router-dom";

export default function Home() {
    const {user, isAuthenticated} = useAuth0();

    useEffect(() => {
        console.log(`Authentication status: ${isAuthenticated ? 'Authenticated' : 'Not authenticated'}`);
        console.log(user);
    }, []);

    if (!isAuthenticated) {
        return <Navigate to="/"/>;
    }

    return (
        <>
            <Navigation usuario={user}/>
            <Divider/>
            <Footer/>
        </>
    );
}