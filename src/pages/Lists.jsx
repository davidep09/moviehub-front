import Navigation from "../components/Navigation.jsx";
import {Button, Divider, Input} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import ListCard from "../components/ListCard.jsx";
import DeleteIcon from "../components/icons/DeleteIcon.jsx";
import {Navigate} from "react-router-dom";

function Lists() {
    const {user, isAuthenticated, isLoading} = useAuth0();
    const [listas, setListas] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const fetchLists = () => {
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
    }

    useEffect(() => {
        if (!isAuthenticated) return;
        fetchLists()
    }, [fetchLists]);

    const handleCrearLista = (id) => {
        const idUsuario = id.replace("|", "-");
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            userId: idUsuario,
            name: inputValue ? inputValue : "Nueva lista",
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("https://moviehub-back.onrender.com/lists", requestOptions)
            .then((response) => response.text())
            .then(() => {
                fetchLists();
            })
            .catch((error) => console.error(error));
    };

    const handleEliminarLista = (listId) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };

        fetch(`https://moviehub-back.onrender.com/lists/${listId}`, requestOptions)
            .then((response) => response.text())
            .then(() => {
                fetchLists();
            })
            .catch((error) => console.error(error));
    }

    if (!isAuthenticated && !isLoading) {
        return <Navigate to={"/"}/>;
    }

    return (
        <>
            <Navigation/>
            <div>
                <Divider/>
                <h1 className="text-center text-2xl my-6">Mis listas</h1>

                <div className="container mx-auto mb-4">
                    <div className="flex justify-center mt-8">
                        <div className="">
                            <ul>
                                {Array.isArray(listas) &&
                                    listas.map((lista) => (
                                        <li key={lista.id} className="list-card">
                                            <div className="flex flex-row">
                                                <ListCard list={lista}/>
                                                <Button
                                                    className="mt-2 ml-1 h-12"
                                                    color="danger"
                                                    isIconOnly
                                                    onPress={() => handleEliminarLista(lista.id)}
                                                >
                                                    <DeleteIcon/>
                                                </Button>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                            <Divider/>
                            <Input
                                className="mt-5"
                                type="text"
                                placeholder="Nueva lista"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <Button
                                onPress={() => handleCrearLista(user.sub)}
                                className="mt-2"
                            >
                                Crear lista
                            </Button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Lists;