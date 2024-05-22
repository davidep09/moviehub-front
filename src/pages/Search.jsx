import {useEffect, useState} from 'react';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import Navigation from "../components/Navigation.jsx";
import {Button, Chip, Divider} from "@nextui-org/react";
import Footer from "../components/Footer.jsx";
import {useAuth0} from "@auth0/auth0-react";
import SearchCarousel from "../components/SearchCarousel.jsx";

function Search() {
    const {isAuthenticated, user, isLoading} = useAuth0();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const term = queryParams.get('term');
    const type = queryParams.get('type');
    const genre = queryParams.get('genre');
    const watchProviders = queryParams.get('watchProviders');
    const sortBy = queryParams.get('sortBy');
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
                    setMoviesResults(data.results);
                    setTotalPages(data.total_pages);
                });
        } else {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son de 0 a 11, por lo que se suma 1
            let yyyy = today.getFullYear();

            let currentDate = yyyy + '-' + mm + '-' + dd;


            if (type === 'movie') {
                let url = 'https://api.themoviedb.org/3/discover/movie?language=es-ES';
                url += `&page=${page}&include_adult=false`;

                url += '&release_date.lte=' + currentDate;

                let sortByMovie = '';
                switch (sortBy) {
                    case 'primary_release_date.desc':
                        sortByMovie = 'release_date.desc';
                        break;
                    case 'primary_release_date.asc':
                        sortByMovie = 'release_date.asc';
                        break;
                    default:
                        sortByMovie = sortBy;
                        break;
                }

                if (sortBy) {
                    url += `&sort_by=${sortByMovie}`;
                }

                if (genre) {
                    url += `&with_genres=${genre}`;
                }

                if (watchProviders) {
                    url += `&with_watch_providers=${watchProviders}&watch_region=ES`;
                }

                fetch(url, options)
                    .then(res => res.json())
                    .then(data => {
                        setMoviesResults(data.results);
                        setTotalPages(data.total_pages);
                    });
            } else if (type === 'tv') {
                let url = 'https://api.themoviedb.org/3/discover/tv?language=es-ES';
                url += `&page=${page}&include_adult=false`;

                url += '&release_date.lte=' + currentDate;


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
                    url += `&sort_by=${sortBySerie}`;
                }

                if (genre) {
                    url += `&with_genres=${genre}`;
                }

                if (watchProviders) {
                    url += `&with_watch_providers=${watchProviders}&watch_region=ES`;
                }

                fetch(url, options)
                    .then(res => res.json())
                    .then(data => {
                        setMoviesResults(data.results);
                        setTotalPages(data.total_pages);
                    });
            }
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

    if (!isAuthenticated && !isLoading) {
        return <Navigate to={"/"}/>;
    }

    return (
        <>
            <Navigation/>
            <div>
                <Divider/>
                <p className="text-center mt-6">
                    <Button variant="flat" color="primary" onPress={() => navigate("/finder")}>
                        Nueva búsquea
                    </Button>
                </p>
                <h2 className="text-center text-2xl mt-2">Búsqueda</h2>
                <h3 className="text-center text-xl">{term && `Resultados para: ${term}`}</h3>
                <h3 className="text-center text-xl">
                    {type && type === 'movie' && <Chip key="'movie" variant="flat" color="success">Películas</Chip>}
                    {type && type === 'tv' && <Chip key="'movie" variant="flat" color="success">Series</Chip>}
                    {genre && genre.split(',').map((genreId) => (
                        <Chip key={genreId} variant="flat" color="primary" className="m-1">{genresConst[genreId]}</Chip>
                    ))}
                    {watchProviders && watchProviders.split(',').map((providerId) => (
                        <Chip key={providerId} variant="flat" color="danger"
                              className="m-1">{watchProvidersConst[providerId]}</Chip>
                    ))}
                    {sortBy && <Chip className="m-1" variant="flat" color="default">{sortByConst[sortBy]}</Chip>}
                </h3>
                <SearchCarousel movies={moviesResults} page={page} totalPages={totalPages}
                                onPageChange={handlePageChange} userLikes={userLikes}/>
            </div>
            <Footer/>
        </>
    );
}

export default Search;