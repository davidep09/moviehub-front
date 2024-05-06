import {useState, useEffect} from "react";
import Navigation from "../components/Navigation.jsx";
import MoviesCarousel from "../components/MoviesCarousel.jsx";
import {Divider} from "@nextui-org/react";
import Footer from "../components/Footer.jsx";
import {Navigate} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";

export default function Trends() {
    const {isAuthenticated} = useAuth0();
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState([]);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTRiMDIzMmQ1NzYwNGRkZWQxZmUwY2Q0MGQwZGFmOCIsInN1YiI6IjY1Y2Y0MWU0NjBjNzUxMDE3YjY5N2M3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fBcHfnQGD2dG6DLXG7TE2diADE_-CN1IZSllpNOb8qg'
            }
        };

        fetch(`https://api.themoviedb.org/3/trending/all/day?language=es-ES&page=${page}`, options)
            .then(response => response.json())
            .then(response => {
                const moviesData = response.results.map(movie => ({
                    id: movie.id,
                    poster_path: movie.poster_path,
                    title: movie.title,
                    name: movie.name,
                    vote_average: movie.vote_average,
                    release_date: movie.release_date,
                    first_air_date: movie.first_air_date,
                    media_type: movie.media_type
                }));
                setMovies(moviesData);
                setPage(response.page);
                setTotalPages(response.total_pages);
            })
            .catch(err => console.error(err));
    }, [page]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    if (!isAuthenticated) {
        return <Navigate to={"/"}/>;
    }

    return (
        <>
            <Navigation/>
            <Divider/>
            <h1 className="text-center text-2xl my-6">Tendencias de hoy</h1>
            <MoviesCarousel movies={movies} page={page} totalPages={totalPages} onPageChange={handlePageChange}/>
            <Footer/>
        </>
    );
}