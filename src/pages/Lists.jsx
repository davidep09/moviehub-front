import Navigation from "../components/Navigation.jsx";
import Footer from "../components/Footer.jsx";
import {Divider} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import ListCard from "../components/ListCard.jsx";
import PropTypes from "prop-types";

function Lists() {
    const {user} = useAuth0();
    const [listas, setListas] = useState([]);

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow",
            mode: "cors"
        };

        const idUsuario = user.sub.replace("|", "-");
        fetch(`http://localhost:8080/lists/user/${idUsuario}`, requestOptions)
            .then(response => response.json())
            .then(result => setListas(result))
            .catch(error => console.log('error', error));
    }, [user.sub]);

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
                                {listas && listas.map(lista => (
                                    <li key={lista.id} className="list-card">
                                        <ListCard list={lista}/>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    );
}

Lists.propTypes = {
    listas: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        user: PropTypes.string.isRequired
    })).isRequired
};

export default Lists;