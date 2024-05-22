import {Navigate, useParams} from "react-router-dom";
import Navigation from "../components/Navigation.jsx";
import {Button, Divider} from "@nextui-org/react";
import {useEffect, useState} from "react";
import Footer from "../components/Footer.jsx";
import MovieCard from "../components/MovieCard.jsx";
import DeleteIcon from "../components/icons/DeleteIcon.jsx";
import {useAuth0} from "@auth0/auth0-react";

function List() {
    const {isAuthenticated, isLoading} = useAuth0();
    const {id} = useParams();
    const [list, setList] = useState({});
    const [items, setItems] = useState([]);
    const [tmdbItems, setTmdbItems] = useState([]);
    useEffect(() => {
        fetchList();
    }, [id]);

    const fetchList = () => {
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

        fetch(`https://moviehub-back.onrender.com/lists/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setList(result);
            })
            .catch(error => console.log('error', error));

        fetch(`https://moviehub-back.onrender.com/itemslist/${id}`, requestOptions)
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
    }
    const handleDelete = (itemId) => {
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };

        fetch(`https://moviehub-back.onrender.com/itemslist/${itemId}`, requestOptions)
            .then((response) => response.text())
            .then(() => {
                fetchList();
            })
            .catch((error) => console.error(error));
    };

    if (!isAuthenticated && !isLoading) {
        return <Navigate to={"/"}/>;
    }

    return (
        <>
            <Navigation/>
            <Divider/>
            <h2 className="text-center text-2xl my-6">{list.name}</h2>
            <div className="container mx-auto mb-4">
                <div className="container">
                    <div className="flex flex-wrap">
                        {tmdbItems.length === 0 ? (
                            <p className="text-center">No hay elementos en la lista</p>
                        ) : (tmdbItems.map((item, index) => (
                            <div key={index} className="w-full sm:w-1/2 lg:w-1/4 p-2">
                                <Button
                                    className="relative top-6 left-72 z-10"
                                    size="sm"
                                    variant="solid"
                                    color="danger"
                                    isIconOnly
                                    onPress={() => handleDelete(items[index].id)}
                                >
                                    <DeleteIcon/>
                                </Button>
                                <MovieCard movie={item}/>
                            </div>
                        )))}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}


export default List;