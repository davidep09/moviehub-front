import {useEffect} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import Navigation from "../components/Navigation.jsx";
import {Divider, Spinner} from "@nextui-org/react";
import Footer from "../components/Footer.jsx";
import {Navigate} from "react-router-dom";

export default function Home() {
    const {user, isAuthenticated, isLoading} = useAuth0();

    useEffect(() => {
        console.log(`Authentication status: ${isAuthenticated ? 'Authenticated' : 'Not authenticated'}`);
        console.log(user);
    }, []);

    if (isLoading) {
        return <Spinner size="large" label="Cargando.." className="m-auto"/>;
    }

    if (!isAuthenticated && !isLoading) {
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