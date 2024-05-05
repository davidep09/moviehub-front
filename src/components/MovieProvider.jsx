import PropTypes from 'prop-types';
import {Image} from '@nextui-org/react';

function MovieProvider({datosPelicula}) {
    const baseURL = "https://image.tmdb.org/t/p/w500"; // replace with your actual base URL

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-center my-4">Disponible en:</h2>
            <div className="flex flex-col mb-4 items-center space-y-5 md:flex-row md:space-x-5 md:space-y-0">
                {datosPelicula.streamingPlatforms && datosPelicula.streamingPlatforms.length > 0 ? datosPelicula.streamingPlatforms.map((platform, index) => {
                    const logoURL = baseURL + platform.logo;
                    return (
                        <div key={index} className="flex flex-col items-center">
                            <Image src={logoURL} alt={platform.name} width={48} height={48}
                                   className="rounded-full"/>
                            <p>{platform.name}</p>
                        </div>
                    )
                }) : <p className="text-center mb-4">No disponible en ninguna plataforma de streaming
                    actualmente.</p>}
            </div>
        </div>
    );
}

MovieProvider.propTypes = {
    datosPelicula: PropTypes.array.isRequired
}

export default MovieProvider;