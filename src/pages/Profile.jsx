import {useEffect, useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import Navigation from "../components/Navigation.jsx";
import {Divider} from "@nextui-org/react";
import Footer from "../components/Footer.jsx";
import FormProfile from "../components/FormProfile.jsx";
import {useNavigate} from "react-router-dom";

function Profile() {
    const {user, isAuthenticated} = useAuth0();
    const {navigate} = useNavigate();
    const [id, setId] = useState();
    const [userProfile, setUserProfile] = useState();

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
        myHeaders.append("Authorization", "Bearer " + import.meta.env.VITE_TMDB_API_KEY);
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://dev-46eceomc6lg0vp4m.eu.auth0.com/api/v2/users/auth0%7C661ef08e4b033ffdfe34c74b", requestOptions)
            .then(response => response.text())
            .then(result => {
                setUserProfile(JSON.parse(result));
            })
            .catch(error => console.log('error', error));
    }, [id]);

    if (!isAuthenticated) {
        navigate("/");
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