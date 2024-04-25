import {useAuth0} from '@auth0/auth0-react';
import Navigation from "../components/Navigation.jsx";
import {Button, Divider, Input, Spinner} from "@nextui-org/react";
import Footer from "../components/Footer.jsx";
import {Navigate, useNavigate} from "react-router-dom";
import TrendsCarousel from "../components/TrendsCarousel.jsx";
import {useEffect, useState} from "react";
import SearchIcon from "../components/icons/SearchIcon.jsx";

export default function Home() {
    const {isAuthenticated, isLoading} = useAuth0();
    const [trends, setTrends] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/search/${searchTerm}`);
    };

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
                            media_type: trend.type // Aquí usamos el media_type de la tendencia
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
                <h1 className="text-center text-2xl my-6">Buscar</h1>
                <div className="flex w-1/2 m-auto my-6">
                    <Input type="search" placeholder="Buscar película o serie"
                           className="flex-grow"
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button onClick={handleClick} className="ml-2" disabled={!searchTerm} isIconOnly>
                        <SearchIcon/>
                    </Button>
                </div>
                <Divider/>
                <TrendsCarousel trends={trends}/>
            </div>
            <Footer/>
        </>
    );
}