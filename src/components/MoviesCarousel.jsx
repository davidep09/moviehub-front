import {Pagination, Spacer} from "@nextui-org/react";
import MovieCard from "./MovieCard.jsx";
import PropTypes from "prop-types";

function MoviesCarousel({movies, page, totalPages, onPageChange, userLikes}) {
    return (
        <div className="mx-auto container">
            <div className="flex flex-wrap justify-between">
                {movies && movies.map((movie, index) => {
                    const isFavorite = userLikes.some(like => like.movieId === movie.id && like.type === movie.media_type);
                    return (
                        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-4">
                            <MovieCard movie={movie} isFavorite={isFavorite}/>
                        </div>
                    );
                })}
            </div>
            <Spacer y={2}/>
            <div className="flex justify-center mb-6">
                <Pagination showControls total={totalPages} page={page} isCompact onChange={onPageChange}/>
            </div>
        </div>
    );
}

MoviesCarousel.propTypes = {
    movies: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    userLikes: PropTypes.array.isRequired
};

export default MoviesCarousel;