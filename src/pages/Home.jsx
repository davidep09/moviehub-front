import {useAuth0} from '@auth0/auth0-react';
import Navigation from "../components/Navigation.jsx";
import {Divider, Spinner} from "@nextui-org/react";
import Footer from "../components/Footer.jsx";
import {Navigate} from "react-router-dom";
import TrendsCarousel from "../components/TrendsCarousel.jsx";
import {useEffect, useState} from "react";

export default function Home() {
    const {isAuthenticated, isLoading} = useAuth0();
    const [mostLiked, setMostLiked] = useState([]);


    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow",
            mode: "cors"
        };

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_HEADER}`
            }
        };

        fetch("https://moviehub-back.onrender.com/totalLikes", requestOptions)
            .then(response => response.json())
            .then(result => {
                const fetches = result.map(item => {
                    const type = item.type === 'movie' ? 'movie' : 'tv';
                    return fetch(`https://api.themoviedb.org/3/${type}/${item.id}?language=es-ES`, options)
                        .then(response => response.json())
                        .then(data => ({...data, media_type: type}));
                });

                return Promise.all(fetches);
            })
            .then(data => {
                setMostLiked(data);
            })
            .catch(error => console.log('error', error));
    }, []);

    if (isLoading) {
        return <Spinner size="large" label="Cargando.." className="m-auto"/>;
    }

    if (!isAuthenticated && !isLoading) {
        return <Navigate to="/"/>;
    }

    return (
        <>
            <Navigation/>
            <Divider/>
            <TrendsCarousel trends={mostLiked}/>
            <Footer/>
        </>
    );
}