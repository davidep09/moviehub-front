import {Pagination, Spacer} from "@nextui-org/react";
import CustomCard from "./CustomCard.jsx";
import PropTypes from "prop-types";

function MoviesCarousel({movies, page, totalPages, onPageChange}) {
    return (
        <>
            <div className="flex flex-wrap justify-between">
                {movies && movies.map((movie, index) => (
                    <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                        <CustomCard movie={movie}/>
                    </div>
                ))}
            </div>
            <Spacer y={2}/>
            <div className="flex justify-center mb-6">
                <Pagination showControls total={totalPages} page={page} isCompact onChange={onPageChange}/>
            </div>
        </>
    );
}

MoviesCarousel.propTypes = {
    movies: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default MoviesCarousel;