import PropTypes from 'prop-types';
import {Image} from '@nextui-org/react';

function SerieProvider({datosSerie}) {
    return (
        <div className="flex flex-col items-center bg-primary-50">
            <h2 className="text-2xl font-bold text-center my-4">Disponible en:</h2>
            <div className="flex flex-col mb-4 items-center space-y-5 md:flex-row md:space-x-5 md:space-y-0">
                {datosSerie.streamingPlatforms ? datosSerie.streamingPlatforms.map((platform, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <Image src={`https://image.tmdb.org/t/p/original${platform.logo_path}`}
                               alt={platform.provider_name} width={48} height={48} className="rounded-full"/>
                        <p>{platform.provider_name}</p>
                    </div>
                )) : <p className="text-center mb-4">No disponible en ninguna plataforma de streaming
                    actualmente.</p>}
            </div>
        </div>
    );
}

SerieProvider.propTypes = {
    datosSerie: PropTypes.shape({
        streamingPlatforms: PropTypes.arrayOf(PropTypes.shape({
            logo_path: PropTypes.string,
            provider_name: PropTypes.string
        }))
    }).isRequired
}

export default SerieProvider;