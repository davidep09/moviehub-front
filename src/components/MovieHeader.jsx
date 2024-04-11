import React from 'react';
import {
    Button,
    Chip,
    Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,
    Textarea, useDisclosure
} from "@nextui-org/react";

export default function MovieHeader({datosPelicula}) {
    const {onOpen: openTrailerModal, onClose: closeTrailerModal, isOpen: isTrailerModalOpen} = useDisclosure();
    const {onOpen: openCastModal, onClose: closeCastModal, isOpen: isCastModalOpen} = useDisclosure();
    const normalizedRating = Math.round(datosPelicula.vote_average / 2);
    const director = datosPelicula.crew ? datosPelicula.crew.find(member => member.roles === 'Director') : undefined;

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
                    estreno: {datosPelicula.release_date}</p>
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
                </div>
            </div>
            <Modal
                size="5xl"
                isOpen={isTrailerModalOpen}
                onClose={closeTrailerModal}
            >
                <ModalContent>
                    {(onClose) => (
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
                                            <Image src={actor.profile_path} className="max-w-14 sm:max-w-32"/>
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