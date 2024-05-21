import {useAuth0} from '@auth0/auth0-react';
import Navigation from "../components/Navigation.jsx";
import {Divider, Spinner} from "@nextui-org/react";
import Footer from "../components/Footer.jsx";
import {useNavigate} from "react-router-dom";
import TrendsCarousel from "../components/TrendsCarousel.jsx";
import {useEffect, useState} from "react";

export default function Home() {
    const {isAuthenticated, isLoading, user} = useAuth0();
    const {navigate} = useNavigate();
    const [mostLiked, setMostLiked] = useState([]);
    const [userLikes, setUserLikes] = useState([]);

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

        fetch("https://moviehub-back.onrender.com/likes/most-liked", requestOptions)
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
    useEffect(() => {
        if (!user) {
            return;
        }

        const usuario = user.sub.replace("|", "-");
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`https://moviehub-back.onrender.com/likes/${usuario}`, requestOptions)
            .then((response) => response.text())
            .then((result) => setUserLikes(JSON.parse(result)))
            .catch((error) => console.error(error));
    }, [user])

    if (isLoading) {
        return <Spinner size="large" label="Cargando.." className="m-auto"/>;
    }

    if (!isAuthenticated && !isLoading) {
        navigate("/");
    }

    return (
        <>
            <Navigation/>
            <Divider/>
            <TrendsCarousel trends={mostLiked} userLikes={userLikes}/>
            <Footer/>
        </>
    );
}