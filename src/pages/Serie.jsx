import {useEffect} from "react";
import {Navigate, useParams} from "react-router-dom";
import {useState} from "react";
import {Divider} from "@nextui-org/react";
import Navigation from "../components/Navigation.jsx";
import SerieHeader from "../components/SerieHeader.jsx";
import SerieSeasons from "../components/SerieSeasons.jsx";
import Footer from "../components/Footer.jsx";
import {useAuth0} from "@auth0/auth0-react";

export default function Serie() {
    const {id} = useParams();
    const [datosSerie, setDatosSerie] = useState([]);
    const {isAuthenticated} = useAuth0();

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + import.meta.env.VITE_TMDB_HEADER
            }
        };

        fetch(`https://api.themoviedb.org/3/tv/${id}?language=es-ES`, options)
            .then(response => response.json())
            .then(response => {
                const serieData = {
                    name: response.name,
                    originalName: response.original_name,
                    year: response.first_air_date ? response.first_air_date.split('-')[0] : 'N/A',
                    tagline: response.tagline ? response.tagline : '',
                    backdrop_path: `https://image.tmdb.org/t/p/original${response.backdrop_path}`,
                    poster_path: `https://image.tmdb.org/t/p/w500${response.poster_path}`,
                    first_air_date: response.first_air_date,
                    vote_average: response.vote_average,
                    overview: response.overview ? response.overview : 'No hay sinopsis disponible.',
                    status: response.status,
                    seasons: response.seasons.map(season => ({
                        id: season.id,
                        name: season.name,
                        episode_count: season.episode_count,
                        air_date: season.air_date,
                        poster_path: `https://image.tmdb.org/t/p/w500${season.poster_path}`,
                        overview: season.overview
                    })),
                    numSeasons: response.number_of_seasons
                };

                // Fetch cast data
                fetch(`https://api.themoviedb.org/3/tv/${id}/aggregate_credits?language=es-ES`, options)
                    .then(response => response.json())
                    .then(response => {
                        serieData.cast = response.cast.slice(0, 10).map(actor => ({
                            name: actor.name,
                            profile_path: actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : "",
                            roles: actor.roles.map(role => role.character)
                        }));

                        setDatosSerie(serieData);
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));

        console.log(datosSerie);
    }, []);

    if (!isAuthenticated) {
        return <Navigate to={"/"}/>;
    }

    return (
        <>
            <Navigation/>
            <Divider/>
            <SerieHeader datosSerie={datosSerie}/>
            <SerieSeasons seasons={datosSerie.seasons}/>
            <Footer/>
        </>
    );
}