import MovieCard from "./MovieCard.jsx";
import PropTypes from "prop-types";

function TrendsCarousel({trends, userLikes}) {
    if (!Array.isArray(trends)) {
        return <p>Las tendencias no están disponibles</p>;
    }

    return (
        <>
            <h2 className="text-center text-2xl my-6">Lo más gustado de MovieHub</h2>
            <div className="flex flex-col sm:flex-row flex-wrap mx-2">
                {trends && trends.map((trend, index) => {
                    const isFavorite = userLikes.some(like => like.movieId === trend.id && like.type === trend.media_type);
                    return (
                        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
                            <MovieCard movie={trend} isFavorite={isFavorite}/>
                        </div>
                    );
                })}
            </div>
        </>
    )
}

TrendsCarousel.propTypes = {
    trends: PropTypes.array,
    userLikes: PropTypes.array
}

export default TrendsCarousel;