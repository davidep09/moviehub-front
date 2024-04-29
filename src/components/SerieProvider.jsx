import PropTypes from 'prop-types';
import {Image} from '@nextui-org/react';

function SeriesProvider({datosSerie}) {
    return (
        <div className="flex flex-col items-center bg-primary-50">
            <h2 className="text-2xl font-bold text-center my-4">Disponible en:</h2>
            <div className="flex flex-col items-center space-y-5 md:flex-row md:space-x-5 md:space-y-0">
                {datosSerie.streamingPlatforms ? datosSerie.streamingPlatforms.map((platform, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <Image src={platform.logo} alt={platform.name} width={48} height={48} className="rounded-full"/>
                        <p>{platform.name}</p>
                        {platform.seasons && (
                            <div>
                                <h3>Temporadas disponibles:</h3>
                                <ul>
                                    {platform.seasons.map((season, index) => (
                                        <li key={index}>{season}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )) : <p className="text-center mb-4">No disponible en ninguna plataforma de streaming
                    actualmente.</p>}
            </div>
        </div>
    );
}

SeriesProvider.propTypes = {
    datosSerie: PropTypes.object.isRequired
}

export default SeriesProvider;