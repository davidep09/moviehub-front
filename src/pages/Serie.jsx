import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import {Divider} from "@nextui-org/react";
import Navigation from "../components/Navigation.jsx";
import SerieHeader from "../components/SerieHeader.jsx";
import SerieSeasons from "../components/SerieSeasons.jsx";
import Footer from "../components/Footer.jsx";
import {useAuth0} from "@auth0/auth0-react";
import SerieProvider from "../components/SerieProvider.jsx";

export default function Serie() {
    const {id} = useParams();
    const [datosSerie, setDatosSerie] = useState([]);
    const {isAuthenticated} = useAuth0();
    const defaultImage = "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg";

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + import.meta.env.VITE_TMDB_HEADER
            }
        };

        const fetchSerieData = fetch(`https://api.themoviedb.org/3/tv/${id}?language=es-ES`, options)
            .then(response => response.json());

        const fetchCastData = fetch(`https://api.themoviedb.org/3/tv/${id}/aggregate_credits?language=es-ES`, options)
            .then(response => response.json());

        const fetchProvidersData = fetch(`https://api.themoviedb.org/3/tv/${id}/watch/providers?`, options)
            .then(response => response.json());

        Promise.all([fetchSerieData, fetchCastData, fetchProvidersData])
            .then(([serieDataResponse, castDataResponse, providersDataResponse]) => {
                const serieData = {
                    name: serieDataResponse.name,
                    originalName: serieDataResponse.original_name,
                    year: serieDataResponse.first_air_date ? new Date(serieDataResponse.first_air_date).getFullYear() : 'N/A',
                    tagline: serieDataResponse.tagline ? serieDataResponse.tagline : '',
                    backdrop_path: serieDataResponse.backdrop_path ? `https://image.tmdb.org/t/p/original${serieDataResponse.backdrop_path}` : defaultImage,
                    poster_path: serieDataResponse.poster_path ? `https://image.tmdb.org/t/p/w500${serieDataResponse.poster_path}` : defaultImage,
                    first_air_date: serieDataResponse.first_air_date ? new Date(serieDataResponse.first_air_date).toLocaleDateString() : 'N/A',
                    vote_average: serieDataResponse.vote_average,
                    overview: serieDataResponse.overview ? serieDataResponse.overview : 'No hay sinopsis disponible.',
                    status: serieDataResponse.status,
                    seasons: serieDataResponse.seasons.map(season => ({
                        id: season.id,
                        name: season.name,
                        episode_count: season.episode_count,
                        air_date: season.air_date ? new Date(season.air_date).toLocaleDateString() : 'N/A',
                        poster_path: `https://image.tmdb.org/t/p/w500${season.poster_path}`,
                        overview: season.overview
                    })),
                    numSeasons: serieDataResponse.number_of_seasons,
                    cast: castDataResponse.cast.slice(0, 10).map(actor => ({
                        name: actor.name,
                        profile_path: actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : defaultImage,
                        roles: actor.roles.map(role => role.character)
                    })),
                    streamingPlatforms: providersDataResponse.results.ES ? providersDataResponse.results.ES.flatrate : []
                };

                setDatosSerie(serieData);
            })
            .catch(err => console.error(err));
    }, [id]);

    if (!isAuthenticated) {
        return <Navigate to={"/"}/>;
    }

    return (
        <>
            <Navigation/>
            <Divider/>
            <SerieHeader datosSerie={datosSerie}/>
            <SerieSeasons seasons={datosSerie.seasons}/>
            <SerieProvider datosSerie={datosSerie}/>
            <Footer/>
        </>
    );
}