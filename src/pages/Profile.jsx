import {useEffect, useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import Navigation from "../components/Navigation.jsx";
import {Divider, Spinner} from "@nextui-org/react";
import Footer from "../components/Footer.jsx";
import FormProfile from "../components/FormProfile.jsx";
import {Navigate} from "react-router-dom";

function Profile() {
    const {user, isAuthenticated} = useAuth0();
    const [id, setId] = useState();
    const [userProfile, setUserProfile] = useState();
    const [loading, setLoading] = useState(true);

    // Recuperar datos del usuario
    useEffect(() => {
        if (user) {
            setId(user.sub);
        }
    }, [user]);

    useEffect(() => {
        if (!id) {
            return;
        }

        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", "Bearer " + import.meta.env.VITE_AUTH0_MANAGEMENT_API_TOKEN);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://dev-46eceomc6lg0vp4m.eu.auth0.com/api/v2/users/${id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                setUserProfile(result);
                setLoading(false);
            })
            .catch(error => console.log('error', error));
    }, [id]);

    // -----------------------------------------

    if (!isAuthenticated) {
        return <Navigate to="/"/>;
    }

    if (loading) { // Si la carga está en verdadero, renderizar un componente de carga
        return <Spinner size="large" label="Cargando.." className="m-auto"/>;
    }

    return (
        <>
            <Navigation/>
            <Divider/>
            <FormProfile usuario={userProfile}/>
            <Footer/>
        </>
    );
}

export default Profile;