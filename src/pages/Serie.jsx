import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useState} from "react";
import {Divider} from "@nextui-org/react";
import Navigation from "../components/Navigation.jsx";
import SerieHeader from "../components/SerieHeader.jsx";
import SerieSeasons from "../components/SerieSeasons.jsx";
import Footer from "../components/Footer.jsx";

export default function Serie() {
    const {id} = useParams();
    const [datosSerie, setDatosSerie] = useState([]);
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTRiMDIzMmQ1NzYwNGRkZWQxZmUwY2Q0MGQwZGFmOCIsInN1YiI6IjY1Y2Y0MWU0NjBjNzUxMDE3YjY5N2M3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fBcHfnQGD2dG6DLXG7TE2diADE_-CN1IZSllpNOb8qg'
            }
        };

        fetch(`https://api.themoviedb.org/3/tv/${id}?language=es-ES`, options)
            .then(response => response.json())
            .then(response => {
                const serieData = {
                    name: response.name,
                    originalName: response.original_name,
                    year: response.first_air_date.split('-')[0],
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