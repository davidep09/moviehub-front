import {useEffect, useState} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import MoviesCarousel from "../components/MoviesCarousel.jsx";
import Navigation from "../components/Navigation.jsx";
import {Divider} from "@nextui-org/react";
import Footer from "../components/Footer.jsx";
import {useAuth0} from "@auth0/auth0-react";

function Search() {
    const {isAuthenticated} = useAuth0();
    const {term} = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if (term) {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_HEADER}`
                }
            };

            fetch(`https://api.themoviedb.org/3/search/multi?language=es-ES&query=${term}&page=${page}&include_adult=false`, options)
                .then(res => res.json())
                .then(data => {
                    setSearchResults(data.results);
                    setTotalPages(data.total_pages);
                });
        }
    }, [term, page]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    if (!isAuthenticated) {
        return <Navigate to="/"/>;
    }

    return (
        <>
            <Navigation/>
            <Divider/>
            <div>
                {term ? (
                    <>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <h1 className="text-center text-2xl my-6">Resultados de "{term}"</h1>
                        <div>
                            <MoviesCarousel movies={searchResults} onPageChange={handlePageChange} page={page}
                                            totalPages={totalPages}/>
                        </div>
                    </>
                ) : (
                    <h1 className="text-center text-2xl my-6">No se ha introducido ninguna palabra</h1>
                )}
            </div>
            <Footer/>
        </>
    );
}

export default Search;