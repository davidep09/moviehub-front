import {Pagination} from "@nextui-org/react";
import MovieCard from "./MovieCard.jsx";
import PropTypes from "prop-types";

function SearchCarousel({movies, series, page, totalPages, onPageChange, userLikes}) {
    return (
        <>
            <div className="container mx-auto grid grid-cols-2 gap-4">
                <div className="col flex flex-col min-h-screen">
                    <h2 className="text-center text-2xl mb-4">Películas</h2>
                    <div className="flex-grow">
                        <div className="flex flex-wrap -mx-2">
                            {movies && movies.map((movie, index) => {
                                const isFavorite = userLikes.some(like => like.movieId === movie.id && like.type === movie.media_type);
                                return (
                                    <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-2">
                                        <MovieCard movie={movie} isFavorite={isFavorite}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="col flex flex-col min-h-screen">
                    <h2 className="text-center text-2xl mb-4">Series</h2>
                    <div className="flex-grow">
                        <div className="flex flex-wrap -mx-2">
                            {series && series.map((serie, index) => {
                                const isFavorite = userLikes.some(like => like.movieId === serie.id && like.type === serie.media_type);
                                return (
                                    <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-2">
                                        <MovieCard movie={serie} isFavorite={isFavorite}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-2 mb-6">
                <Pagination total={totalPages} page={page} onChange={onPageChange}/>
            </div>
        </>
    );
}

SearchCarousel.propTypes = {
    movies: PropTypes.array.isRequired,
    series: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    userLikes: PropTypes.array.isRequired,
};

export default SearchCarousel;
