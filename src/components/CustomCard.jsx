import {Card, CardBody, CardHeader, Image} from "@nextui-org/react";
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';

function CustomCard({movie}) {
    const navigate = useNavigate();
    const handlerClick = () => {
        if (movie.media_type === 'tv') {
            navigate(`/serie/${movie.id}`);
        } else {
            navigate(`/movie/${movie.id}`);
        }
    };
    return (
        <Card className="w-full sm:min-w-1/2 md:min-w-1/3 lg:min-w-1/4 xl:min-w-1/5 2xl:min-w-1/6 mx-2" isPressable
              onPress={handlerClick}>
            <CardHeader className="pb-0 flex-col">
                <Image
                    alt={movie.title || movie.name}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    radius="sm"
                    className="h-[400px] w-full object-cover"
                />
            </CardHeader>
            <CardBody className="pt-1">
                <h4 className="pl-2 font-bold text-large overflow-hidden whitespace-nowrap">{movie.title || movie.name}</h4>
                <small className="pl-2 text-default-500">{movie.vote_average}</small>
                <p className="pl-2 text-tiny uppercase font-bold">{movie.release_date || movie.first_air_date}</p>
            </CardBody>
        </Card>
    );
}

CustomCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        media_type: PropTypes.string.isRequired,
        title: PropTypes.string,
        name: PropTypes.string,
        poster_path: PropTypes.string,
        vote_average: PropTypes.number,
        release_date: PropTypes.string,
        first_air_date: PropTypes.string
    }).isRequired
};

export default CustomCard;