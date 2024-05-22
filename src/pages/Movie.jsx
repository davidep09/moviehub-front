import Footer from "../components/Footer.jsx";
import Navigation from "../components/Navigation.jsx";
import {Divider, Spinner} from "@nextui-org/react";
import MovieHeader from "../components/MovieHeader.jsx";
import MovieProvider from "../components/MovieProvider.jsx";
import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import MovieComments from "../components/MovieComments.jsx";

export default function Movie() {
    const {isAuthenticated, user} = useAuth0();
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [datosPelicula, setDatosPelicula] = useState([]);
    const [listas, setListas] = useState([]);
    const defaultImage = "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg";

    useEffect(() => {
        if (!isAuthenticated) return;


        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + import.meta.env.VITE_TMDB_HEADER
            }
        };

        const fetchMovieData = fetch(`https://api.themoviedb.org/3/movie/${id}?language=es-ES`, options)
            .then(response => response.json());

        const fetchCastData = fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=es-ES`, options)
            .then(response => response.json());

        const fetchVideosData = fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=es-ES`, options)
            .then(response => response.json());

        const fetchProvidersData = fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?language=es-ES`, options)
            .then(response => response.json());

        Promise.all([fetchMovieData, fetchCastData, fetchVideosData, fetchProvidersData])
            .then(([movieDataResponse, castDataResponse, videosDataResponse, providersDataResponse]) => {
                const movieData = {
                    id: movieDataResponse.id,
                    title: movieDataResponse.title,
                    originalName: movieDataResponse.original_title,
                    tagline: movieDataResponse.tagline ? movieDataResponse.tagline : '',
                    backdrop_path: movieDataResponse.backdrop_path ? `https://image.tmdb.org/t/p/original${movieDataResponse.backdrop_path}` : defaultImage,
                    poster_path: movieDataResponse.poster_path ? `https://image.tmdb.org/t/p/w500${movieDataResponse.poster_path}` : defaultImage,
                    release_date: movieDataResponse.release_date,
                    vote_average: movieDataResponse.vote_average,
                    overview: movieDataResponse.overview ? movieDataResponse.overview : 'No hay sinopsis disponible.',
                    status: movieDataResponse.status,
                };

                if (castDataResponse.cast) {
                    movieData.cast = castDataResponse.cast.slice(0, 10).map(actor => ({
                        name: actor.name,
                        profile_path: actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : defaultImage,
                        roles: actor.character
                    }));
                }
                if (castDataResponse.crew) {
                    movieData.crew = castDataResponse.crew.slice(0, 10).map(crew => ({
                        name: crew.name,
                        profile_path: crew.profile_path ? `https://image.tmdb.org/t/p/w500${crew.profile_path}` : defaultImage,
                        roles: crew.job
                    }));
                }

                if (videosDataResponse.results) {
                    const trailer = videosDataResponse.results.find(video => video.type === 'Trailer');
                    if (trailer) {
                        movieData.trailer_url = `https://www.youtube.com/embed/${trailer.key}`;
                    }
                }

                if (providersDataResponse.results) {
                    const esProviders = providersDataResponse.results.ES;
                    if (esProviders && esProviders.flatrate) {
                        movieData.streamingPlatforms = esProviders.flatrate.map(provider => ({
                            name: provider.provider_name,
                            logo: provider.logo_path
                        }));
                    }
                }
                setDatosPelicula(movieData);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, [id]);

    useEffect(() => {
        if (!isAuthenticated) return;
        
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

    if (!isAuthenticated && !isLoading) {
        return <Navigate to={"/"}/>;
    }

    if (isLoading) {
        return <Spinner size="large" label="Cargando.." className="m-auto"/>;
    }


    return (
        <>
            <Navigation/>
            <MovieHeader datosPelicula={datosPelicula} listas={listas}/>
            <MovieProvider datosPelicula={datosPelicula}/>
            <MovieComments datosPelicula={datosPelicula}/>
            <Divider/>
            <Footer/>
        </>
    );
}