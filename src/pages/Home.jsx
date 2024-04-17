import {useEffect} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import Navigation from "../components/Navigation.jsx";
import {Divider} from "@nextui-org/react";
import Footer from "../components/Footer.jsx";

export default function Home() {
    const {user, isAuthenticated, isLoading, loginWithRedirect} = useAuth0();

    useEffect(() => {
        console.log(`Authentication status: ${isAuthenticated ? 'Authenticated' : 'Not authenticated'}`);

    }, [isAuthenticated, loginWithRedirect]);

    return (
        isAuthenticated && (
            <>
                <Navigation usuario={user}/>
                <Divider/>
                <Footer/>
            </>
        )
    );
}