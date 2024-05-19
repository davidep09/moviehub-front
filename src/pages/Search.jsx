import {useEffect, useState} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import Navigation from "../components/Navigation.jsx";
import {Chip, Divider} from "@nextui-org/react";
import Footer from "../components/Footer.jsx";
import {useAuth0} from "@auth0/auth0-react";
import SearchCarousel from "../components/SearchCarousel.jsx";

function Search() {
    const {isAuthenticated, user} = useAuth0();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const term = queryParams.get('term');
    const genre = queryParams.get('genre');
    const watchProviders = queryParams.get('watchProviders');
    const sortBy = queryParams.get('sortBy');
    const [seriesResults, setSeriesResults] = useState([]);
    const [moviesResults, setMoviesResults] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [userLikes, setUserLikes] = useState([]);
    const genresConst = {
        10759: "Acción & Aventura",
        16: "Animación",
        35: "Comedia",
        80: "Crimen",
        99: "Documental",
        18: "Drama",
        10751: "Familia",
        10762: "Niños",
        9648: "Misterio",
        10763: "Noticias",
        10764: "Reality",
        10765: "Ciencia-ficción & Fantasía",
        10766: "Telenovela",
        10767: "Conversación",
        10768: "Guerra & Política",
        37: "Del oeste",
    }
    const watchProvidersConst = {
        337: "Disney Plus",
        119: "Amazon Prime Video",
        8: "Netflix",
        384: "HBO Max",
        2: "Apple TV",
        63: "Filmin",
        1773: "SkyShowtime",
        149: "Movistar Plus",
        35: "Rakuten TV",
        62: "Atresplayer"
    }
    const sortByConst = {
        "popularity.desc": "Popularidad",
        "vote_average.desc": "Valoración",
        "primary_release_date.desc": "Fecha de estreno más reciente",
        "primary_release_date.asc": "Fecha de estreno más antigua",
        "title.desc": "Título"
    }


    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_HEADER}`
            }
        };

        if (term) {
            fetch(`https://api.themoviedb.org/3/search/multi?language=es-ES&query=${term}&page=${page}&include_adult=false`, options)
                .then(res => res.json())
                .then(data => {
                    setSeriesResults(data.results.filter(result => result.media_type === 'tv'));
                    setMoviesResults(data.results.filter(result => result.media_type === 'movie'));
                    setTotalPages(data.total_pages);
                });
        } else {
            let urlSeries = 'https://api.themoviedb.org/3/discover/tv?language=es-ES';
            let urlMovies = 'https://api.themoviedb.org/3/discover/movie?language=es-ES';

            urlSeries += `&page=${page}&include_adult=false`;
            urlMovies += `&page=${page}&include_adult=false`;

            let sortBySerie = '';
            switch (sortBy) {
                case 'primary_release_date.desc':
                    sortBySerie = 'first_air_date.desc';
                    break;
                case 'primary_release_date.asc':
                    sortBySerie = 'first_air_date.asc';
                    break;
                default:
                    sortBySerie = sortBy;
                    break;
            }

            if (sortBy) {
                urlSeries += `&sort_by=${sortBySerie}`;
                urlMovies += `&sort_by=${sortBy}`;
            }

            if (genre) {
                urlSeries += `&with_genres=${genre}`;
                urlMovies += `&with_genres=${genre}`;
            }

            if (watchProviders) {
                urlSeries += `&with_watch_providers=${watchProviders}&watch_region=ES`;
                urlMovies += `&with_watch_providers=${watchProviders}&watch_region=ES`;
            }

            Promise.all([
                fetch(urlSeries, options).then(res => res.json()),
                fetch(urlMovies, options).then(res => res.json())
            ]).then(([seriesData, moviesData]) => {
                const seriesResultsWithMediaType = seriesData.results.map(series => ({...series, media_type: 'tv'}));
                const moviesResultsWithMediaType = moviesData.results.map(movie => ({...movie, media_type: 'movie'}));

                setSeriesResults(seriesResultsWithMediaType);
                setMoviesResults(moviesResultsWithMediaType);

                seriesData.total_pages > moviesData.total_pages ? setTotalPages(seriesData.total_pages) : setTotalPages(moviesData.total_pages);
            });
        }
    }, [genre, location.search, page, term, watchProviders, sortBy]);
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

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    if (!isAuthenticated) {
        return <Navigate to="/"/>;
    }

    return (
        <>
            <Navigation/>
            <div>
                <Divider/>
                <h2 className="text-center text-2xl mt-6">Búsqueda</h2>
                <h3 className="text-center text-xl">{term && `Resultados para: ${term}`}</h3>
                <h3 className="text-center text-xl">
                    {genre && genre.split(',').map((genreId) => (
                        <Chip key={genreId} variant="flat" color="primary" className="m-1">{genresConst[genreId]}</Chip>
                    ))}
                    {watchProviders && watchProviders.split(',').map((providerId) => (
                        <Chip key={providerId} variant="flat" color="primary"
                              className="m-1">{watchProvidersConst[providerId]}</Chip>
                    ))}
                    {sortBy && <Chip className="m-1" variant="flat" color="primary">{sortByConst[sortBy]}</Chip>}
                </h3>
                <SearchCarousel movies={moviesResults} series={seriesResults} page={page} totalPages={totalPages}
                                onPageChange={handlePageChange} userLikes={userLikes}/>
            </div>
            <Footer/>
        </>
    );
}

export default Search;