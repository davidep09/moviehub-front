import {useEffect, useState} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import Navigation from "../components/Navigation.jsx";
import {Divider} from "@nextui-org/react";
import Footer from "../components/Footer.jsx";
import {useAuth0} from "@auth0/auth0-react";
import SearchCarousel from "../components/SearchCarousel.jsx";

function Search() {
    const {isAuthenticated} = useAuth0();
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

            if (sortBy) {
                urlSeries += `&sort_by=${sortBy}`;
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

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    if (!isAuthenticated) {
        return <Navigate to="/"/>;
    }

    return (
        <>
            <Navigation/>
            <div className="bg-primary-50">
                <Divider/>
                <h2 className="text-center text-2xl my-6">Búsqueda</h2>
                <SearchCarousel movies={moviesResults} series={seriesResults} page={page} totalPages={totalPages}
                                onPageChange={handlePageChange}/>
            </div>
            <Footer/>
        </>
    );
}

export default Search;