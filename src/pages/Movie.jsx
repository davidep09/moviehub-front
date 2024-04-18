import Footer from "../components/Footer.jsx";
import Navigation from "../components/Navigation.jsx";
import {Divider} from "@nextui-org/react";
import MovieHeader from "../components/MovieHeader.jsx";
import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";

export default function Movie() {
    const {isAuthenticated} = useAuth0();
    const {id} = useParams();
    const [datosPelicula, setDatosPelicula] = useState([]);
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTRiMDIzMmQ1NzYwNGRkZWQxZmUwY2Q0MGQwZGFmOCIsInN1YiI6IjY1Y2Y0MWU0NjBjNzUxMDE3YjY5N2M3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fBcHfnQGD2dG6DLXG7TE2diADE_-CN1IZSllpNOb8qg'
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${id}?language=es-ES`, options)
            .then(response => response.json())
            .then(response => {
                const movieData = {
                    title: response.title,
                    originalName: response.original_title,
                    tagline: response.tagline ? response.tagline : '',
                    backdrop_path: `https://image.tmdb.org/t/p/original${response.backdrop_path}`,
                    poster_path: `https://image.tmdb.org/t/p/w500${response.poster_path}`,
                    release_date: response.release_date,
                    vote_average: response.vote_average,
                    overview: response.overview ? response.overview : 'No hay sinopsis disponible.',
                    status: response.status,
                };

                // Fetch cast y crew data
                fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=es-ES`, options)
                    .then(response => response.json())
                    .then(response => {
                        movieData.cast = response.cast.slice(0, 10).map(actor => ({
                            name: actor.name,
                            profile_path: actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : "",
                            roles: actor.character
                        }));
                        movieData.crew = response.crew.slice(0, 10).map(crew => ({
                            name: crew.name,
                            profile_path: crew.profile_path ? `https://image.tmdb.org/t/p/w500${crew.profile_path}` : "",
                            roles: crew.job
                        }));

                        setDatosPelicula(movieData);
                    })
                    .catch(err => console.error(err));

                // Fetch videos data
                fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=es-ES`, options)
                    .then(response => response.json())
                    .then(response => {
                        const trailer = response.results.find(video => video.type === 'Trailer');
                        if (trailer) {
                            movieData.trailer_url = `https://www.youtube.com/embed/${trailer.key}`;
                        }
                        setDatosPelicula(movieData);
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    }, []);

    if (!isAuthenticated) {
        return <Navigate to={"/"}/>;
    }

    return (
        <>
            <Navigation/>
            <MovieHeader datosPelicula={datosPelicula}/>
            <Divider/>
            <Footer/>
        </>
    );
}