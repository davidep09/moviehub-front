import {
    Button,
    Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,
    Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,
    Textarea, useDisclosure
} from "@nextui-org/react";
import PropTypes from "prop-types";
import PlusIcon from "./icons/PlusIcon.jsx";

export default function MovieHeader({datosPelicula, listas}) {
    const {onOpen: openTrailerModal, onClose: closeTrailerModal, isOpen: isTrailerModalOpen} = useDisclosure();
    const {onOpen: openCastModal, onClose: closeCastModal, isOpen: isCastModalOpen} = useDisclosure();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const normalizedRating = Math.round(datosPelicula.vote_average / 2);
    const director = datosPelicula.crew ? datosPelicula.crew.find(member => member.roles === 'Director') : undefined;

    const handleAddToList = (listId) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "listId": listId,
            "movieId": datosPelicula.id,
            "type": "movie"
        });

        fetch(`http://localhost:8080/itemslist/${listId}`, {
            method: "GET",
            headers: myHeaders,
        })
            .then(response => response.json())
            .then(list => {
                const itemExists = list.some(item => item.movieId === datosPelicula.id && item.type === "movie");

                if (!itemExists) {
                    const requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw,
                        redirect: "follow"
                    };

                    fetch("http://localhost:8080/itemslist", requestOptions)
                        .then((response) => response.text())
                        .then(() => alert("Elemento añadido correctamente."))
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
                 backgroundImage: `url(${datosPelicula.backdrop_path})`,
             }}>
            <div className="absolute inset-0 bg-gray-950 opacity-50"></div>
            <div className="flex-row w-56 mx-auto sm:mx-0 z-10">
                <Image src={datosPelicula.poster_path}/>
                <h1 className="text-2xl font-bold text-center text-white mt-4">{datosPelicula.title}</h1>
                <h2 className="text-xs font-bold text-center text-white">
                    <Chip color={datosPelicula.status === 'Ended' ? 'danger' : 'success'} size="sm">{
                        datosPelicula.status === 'Ended' ? 'Finalizada' : 'En emisión'
                    }</Chip>
                    &nbsp;{datosPelicula.originalName}&nbsp;({new Date(datosPelicula.release_date).getFullYear()})
                </h2>
                <p className="text-center italic text-white mt-4 px-2">{datosPelicula.tagline}</p>
            </div>
            <div className="flex flex-col w-full sm:pl-16 z-10">
                <p className="text-center text-white font-semibold sm:text-left sm:flex-row">Fecha de
                    estreno: {new Date(datosPelicula.release_date).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })}
                </p>
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
                    value={datosPelicula.overview}
                    className="mt-4 mx-auto sm:mx-0"
                />
                <p className="text-center text-white font-semibold sm:text-left sm:flex-row mt-4">Director: <strong
                    className="font-normal">{director ? director.name : 'No disponible'}</strong>
                </p>
                <div>
                    <Button className="mt-4 mr-2 max-w-32" onPress={openCastModal}>
                        Reparto
                    </Button>
                    <Button color="default" className="max-w-32 mt-4 ml-2" auto
                            onPress={() => {
                                if (window.innerWidth < 768) {
                                    window.open(datosPelicula.trailer_url, '_blank');
                                } else {
                                    openTrailerModal();
                                }
                            }}>
                        Ver tráiler
                    </Button>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button className="mt-4 max-w-32 mx-4" onPress={onOpen}
                                    isIconOnly>
                                <PlusIcon/>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu isOpen={isOpen} onClose={onClose}>
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
                isOpen={isTrailerModalOpen}
                onClose={closeTrailerModal}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Trailer</ModalHeader>
                            <ModalBody>
                                <iframe src={datosPelicula.trailer_url + "?autoplay=1"} width="100%" height="500px"/>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal
                size="5xl"
                isOpen={isCastModalOpen}
                onClose={closeCastModal}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Reparto</ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 justify-center">
                                    {datosPelicula.cast && datosPelicula.cast.map((actor, index) => (
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

MovieHeader.propTypes = {
    datosPelicula: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        originalName: PropTypes.string,
        release_date: PropTypes.string,
        vote_average: PropTypes.number,
        status: PropTypes.string,
        backdrop_path: PropTypes.string,
        poster_path: PropTypes.string,
        tagline: PropTypes.string,
        overview: PropTypes.string,
        crew: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            roles: PropTypes.string
        })),
        cast: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            roles: PropTypes.string,
            profile_path: PropTypes.string
        })),
        trailer_url: PropTypes.string
    }).isRequired,

    listas: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    })).isRequired
};
