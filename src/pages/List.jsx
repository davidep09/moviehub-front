import {useParams} from "react-router-dom";
import Navigation from "../components/Navigation.jsx";
import {Divider} from "@nextui-org/react";
import {useEffect, useState} from "react";
import Footer from "../components/Footer.jsx";
import MovieCard from "../components/MovieCard.jsx";
import PropTypes from "prop-types";

function List() {
    const {id} = useParams();
    const [list, setList] = useState({});
    const [items, setItems] = useState([]);
    const [tmdbItems, setTmdbItems] = useState([]);
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + import.meta.env.VITE_TMDB_HEADER
            }
        };

        const requestOptions = {
            method: "GET",
            redirect: "follow",
            mode: "cors"
        };

        fetch(`http://localhost:8080/lists/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setList(result);
            })
            .catch(error => console.log('error', error));

        fetch(`http://localhost:8080/itemslist/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setItems(Object.values(result));
                return Promise.all(result.map(item =>
                    fetch(`https://api.themoviedb.org/3/${item.type}/${item.movieId}?language=es-ES`, options)
                        .then(response => response.json())
                        .then(tmdbItem => ({...tmdbItem, media_type: item.type}))
                ));
            })
            .then(results => {
                setTmdbItems(results);
            })
            .catch(error => console.log('error', error));
    }, [id]);

    return (
        <>
            <Navigation/>
            <Divider/>
            <h2 className="text-center text-2xl my-6">{list.name}</h2>
            <div className="container mx-auto mb-4">
                <div className="container">
                    <div className="flex flex-wrap">
                        {tmdbItems.map((item, index) => (
                            <div key={index} className="w-full sm:w-1/2 lg:w-1/4 p-2">
                                <MovieCard movie={item}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

List.propTypes = {
    id: PropTypes.number.isRequired
};

export default List;