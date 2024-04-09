import React from 'react';
import {
    Chip,
    Image,
    Textarea
} from "@nextui-org/react";

export default function MovieHeader({datosPelicula}) {
    const normalizedRating = Math.round(datosPelicula.vote_average / 2);
    const director = datosPelicula.crew.find(member => member.roles === 'Director');

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
            </div>
        </div>
    );
}