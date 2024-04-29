import {useAuth0} from '@auth0/auth0-react';
import Navigation from "../components/Navigation.jsx";
import {Divider, Spinner} from "@nextui-org/react";
import Footer from "../components/Footer.jsx";
import {Navigate} from "react-router-dom";
import TrendsCarousel from "../components/TrendsCarousel.jsx";
import {useEffect, useState} from "react";

export default function Home() {
    const {isAuthenticated, isLoading} = useAuth0();
    const [trends, setTrends] = useState([]);


    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_HEADER}`
            }
        };

        fetch("http://localhost:8080/trends", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                const trends = result._embedded.trends;
                const tmdbRequests = trends.map((trend) => {
                    const url = trend.type === 'movie'
                        ? `https://api.themoviedb.org/3/movie/${trend.id}?language=es-ES`
                        : `https://api.themoviedb.org/3/tv/${trend.id}?language=es-ES`;
                    return fetch(url, options)
                        .then((response) => response.json())
                        .then((tmdbResult) => ({
                            ...tmdbResult,
                            media_type: trend.type
                        }));
                });
                return Promise.all(tmdbRequests);
            })
            .then((tmdbResults) => setTrends(tmdbResults))
            .catch((error) => console.error(error));
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
            <div className="bg-primary-50">
                <Divider/>
                <TrendsCarousel trends={trends}/>
            </div>
            <Footer/>
        </>
    );
}