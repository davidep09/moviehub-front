import {
    Accordion,
    AccordionItem,
    Card,
    Image,
    Textarea,
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure
} from "@nextui-org/react";
import {useState} from 'react';
import {useParams} from "react-router-dom";
import PropTypes from "prop-types";

export default function SerieSeasons({seasons}) {
    const {id} = useParams();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [selectedSeason, setSelectedSeason] = useState(null);

    const handleOpenModal = (season) => {
        setSelectedSeason(season);
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_HEADER}`
            }
        };

        fetch(`https://api.themoviedb.org/3/tv/${id}/season/${selectedSeason}?language=es-ES`, options)
            .then(response => response.json())
            .then(response => {
                season.episodes = response.episodes;
                onOpen();
            })
            .catch(err => console.error(err));
    }

    return (
        <div className="sm:w-[90%] mx-auto flex flex-col items-center justify-center sm:items-start">
            <h1 className="text-2xl font-bold text-center mt-2">Temporadas</h1>
            <Accordion variant="light" className="shadow-none">
                {seasons && seasons.map((season, index) => (
                    <AccordionItem key={index} title={season.name} className="shadow-none">
                        <Card className="flex flex-col sm:flex-row p-3 shadow-none items-center sm:items-start">
                            <div className="w-64 h-64 flex items-center justify-center">
                                <Image src={season.poster_path} className="h-64 object-cover"/>
                            </div>
                            <div className="w-[80%] sm:flex sm:flex-col items-center sm:items-start">
                                <p className="text-center">Episodios: {season.episode_count}</p>
                                <p className="text-center">Fecha de estreno: {season.air_date}</p>
                                <Textarea className="mt-2" label="Sinopsis" isReadOnly
                                          value={season.overview ? season.overview : "No hay sinopsis disponible"}/>
                                <div className="flex justify-center w-full">
                                    <Button className="mt-2 w-1/2" auto onClick={() => handleOpenModal(season)}>Ver
                                        episodios</Button>
                                </div>
                            </div>
                        </Card>
                    </AccordionItem>
                ))}
            </Accordion>

            <Modal
                size="5xl"
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{selectedSeason?.name}</ModalHeader>
                            <ModalBody style={{maxHeight: '80vh', overflowY: 'auto'}}>
                                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 justify-center">
                                    {selectedSeason?.episodes && selectedSeason.episodes.length > 0 ? (
                                        selectedSeason.episodes.map((episode, index) => (
                                            <Card key={index} className="flex flex-col items-center"
                                                  style={{minWidth: '200px', minHeight: '300px'}}>
                                                <Image src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                                                       className="max-w-44 sm:max-w-32 mt-4"/>
                                                <p className="text-center font-bold px-2">{episode.name}</p>
                                                <p className="text-center px-2">{episode.air_date}</p>
                                                <p className="text-center px-2">{episode.overview ? episode.overview : "No hay descripción disponible"}</p>
                                                <p className="text-center px-2">Puntuación: {episode.vote_average.toFixed(1)}</p>
                                                <p className="text-center px-2">{new Date(episode.air_date).toLocaleDateString()}</p>
                                            </Card>
                                        ))
                                    ) : (
                                        <p className="text-center">No hay información disponible para los episodios de
                                            esta
                                            temporada.</p>
                                    )}
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

SerieSeasons.propTypes = {
    seasons: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        poster_path: PropTypes.string,
        episode_count: PropTypes.number,
        air_date: PropTypes.string,
        overview: PropTypes.string
    })).isRequired
};