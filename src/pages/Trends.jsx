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
                    key: movie.id,
                    id: movie.id,
                    fecha: movie.release_date ? movie.release_date : movie.first_air_date,
                    rating: movie.vote_average ? movie.vote_average : 0,
                    title: movie.title ? movie.title : movie.name,
                    url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
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
            <div className="bg-primary-50">
                <Divider/>
                <h1 className="text-2xl text-center mt-4">Tendencias de hoy</h1>
                <MoviesCarousel movies={movies} page={page} totalPages={totalPages} onPageChange={handlePageChange}/>
                <Footer/>
            </div>
        </>
    );
}