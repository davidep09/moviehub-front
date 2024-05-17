import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import {Divider, Spinner} from "@nextui-org/react";
import Navigation from "../components/Navigation.jsx";
import SerieHeader from "../components/SerieHeader.jsx";
import SerieSeasons from "../components/SerieSeasons.jsx";
import Footer from "../components/Footer.jsx";
import {useAuth0} from "@auth0/auth0-react";
import SerieProvider from "../components/SerieProvider.jsx";
import SerieComments from "../components/SerieComments.jsx";

export default function Serie() {
    const {isAuthenticated, user} = useAuth0();
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [datosSerie, setDatosSerie] = useState([]);
    const [listas, setListas] = useState([]);
    const defaultImage = "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg";

    useEffect(() => {
        if (!id) return;

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

        const fetchCommentsData = fetch(`https://moviehub-back.onrender.com/comments/tv/${id}`)
            .then(response => response.json());

        Promise.all([fetchSerieData, fetchCastData, fetchProvidersData, fetchCommentsData])
            .then(([serieDataResponse, castDataResponse, providersDataResponse, commentsDataResponse]) => {
                const serieData = {
                    id: serieDataResponse.id,
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
                    streamingPlatforms: providersDataResponse.results.ES ? providersDataResponse.results.ES.flatrate : [],
                    comments: commentsDataResponse ? commentsDataResponse : []
                };
                setDatosSerie(serieData);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, [id]);

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow",
            mode: "cors"
        };

        const idUsuario = user.sub.replace("|", "-");
        fetch(`https://moviehub-back.onrender.com/lists/user/${idUsuario}`, requestOptions)
            .then(response => response.json())
            .then(result => setListas(result))
            .catch(error => console.log('error', error));
    }, [user.sub]);

    if (!isAuthenticated) {
        return <Navigate to={"/"}/>;
    }

    if (isLoading) {
        return <Spinner size="large" label="Cargando.." className="m-auto"/>;
    }

    return (
        <>
            <Navigation/>
            <Divider/>
            <SerieHeader datosSerie={datosSerie} listas={listas}/>
            <SerieSeasons seasons={datosSerie.seasons}/>
            <SerieProvider datosSerie={datosSerie}/>
            <SerieComments datosSerie={datosSerie}/>
            <Footer/>
        </>
    );
}