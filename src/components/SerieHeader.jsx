import {
    Image,
    Textarea,
    Chip,
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure, ModalFooter, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger
} from "@nextui-org/react";
import PropTypes from "prop-types";
import PlusIcon from "../assets/icons/PlusIcon.jsx";

export default function SerieHeader({datosSerie, listas}) {
    const normalizedRating = Math.round(datosSerie.vote_average / 2);
    const {isOpen, onOpen, onClose} = useDisclosure();

    const handleAddToList = (listId) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "listId": listId,
            "movieId": datosSerie.id,
            "type": "tv"
        });

        fetch(`http://localhost:8080/itemslist/${listId}`, {
            method: "GET",
            headers: myHeaders,
        })
            .then(response => response.json())
            .then(list => {
                const itemExists = list.some(item => item.movieId === datosSerie.id && item.type === "tv");

                if (!itemExists) {
                    const requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw,
                        redirect: "follow"
                    };

                    fetch("http://localhost:8080/itemslist", requestOptions)
                        .then((response) => response.text())
                        .catch((error) => console.error(error));
                } else {
                    alert("Este elemento ya está en la lista.");
                }
            })
            .catch((error) => console.error(error));
    }

    return (
        <div className="flex flex-col sm:flex-row p-10 bg-no-repeat bg-cover bg-center relative font-body"
             style={{
                 backgroundImage: `url(${datosSerie.backdrop_path})`,
             }}>
            <div className="absolute inset-0 bg-gray-950 opacity-50"></div>
            <div className="flex-row w-56 mx-auto sm:mx-0 z-10">
                <Image src={datosSerie.poster_path}/>
                <h1 className="text-2xl font-bold text-center text-white mt-4">{datosSerie.name}</h1>
                <h2 className="text-xs font-bold text-center text-white">
                    <Chip color={datosSerie.status === 'Ended' ? 'danger' : 'success'} size="sm">{
                        datosSerie.status === 'Ended' ? 'Finalizada' : 'En emisión'
                    }</Chip>
                    &nbsp;{datosSerie.originalName}&nbsp;({datosSerie.year})
                </h2>
                <p className="text-center italic text-white mt-4 px-2">{datosSerie.tagline}</p>
            </div>
            <div className="flex flex-col w-full sm:pl-16 z-10">
                <p className="text-center text-white font-semibold sm:text-left sm:flex-row">Fecha de
                    estreno: {datosSerie.first_air_date}</p>
                <p className="text-center text-white font-semibold sm:text-left sm:flex-row">
                    Puntuación:&nbsp;
                    {[...Array(5)].map((star, i) => {
                        return i < normalizedRating ? '★' : '☆';
                    })}
                </p>
                <Textarea
                    isReadOnly
                    label="Sinopsis"
                    variant="faded"
                    labelPlacement="inside"
                    value={datosSerie.overview}
                    className="mt-4 mx-auto sm:mx-0"
                />
                <div className="flex flex-row">
                    <Button className="mt-4 max-w-32 mx-2" onPress={onOpen}>
                        Reparto
                    </Button>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button className="mt-4 max-w-32 mx-2" onPress={onOpen} isIconOnly>
                                <PlusIcon/>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            {listas.map((lista, index) => (
                                <DropdownItem key={index} onPress={() => handleAddToList(lista.id)}>
                                    {lista.name}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>

            <Modal
                size="5xl"
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Reparto</ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 justify-center">
                                    {datosSerie.cast && datosSerie.cast.map((actor, index) => (
                                        <div key={index} className="flex flex-col items-center">
                                            <Image src={actor.profile_path}
                                                   className="max-w-14 sm:max-w-32 w-full object-cover h-40"/>
                                            <p className="text-center font-bold">{actor.name}</p>
                                            <p className="text-center">{actor.roles}</p>
                                        </div>
                                    ))}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

SerieHeader.propTypes = {
    datosSerie: PropTypes.shape({
        id: PropTypes.number,
        backdrop_path: PropTypes.string,
        poster_path: PropTypes.string,
        name: PropTypes.string,
        originalName: PropTypes.string,
        year: PropTypes.string,
        status: PropTypes.string,
        first_air_date: PropTypes.string,
        vote_average: PropTypes.number,
        tagline: PropTypes.string,
        overview: PropTypes.string,
        cast: PropTypes.arrayOf(PropTypes.shape({
            profile_path: PropTypes.string,
            name: PropTypes.string,
            roles: PropTypes.string
        }))
    }).isRequired,

    listas: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    })).isRequired

};