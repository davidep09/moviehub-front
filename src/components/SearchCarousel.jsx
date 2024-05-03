import {Pagination} from "@nextui-org/react";
import CustomCard from "./CustomCard.jsx";
import PropTypes from "prop-types";

function SearchCarousel({movies, series, page, totalPages, onPageChange}) {
    return (
        <div className="container mx-auto px-4 grid grid-cols-2">
            <div className="col grid grid-cols-1 mr-2">
                <div className="flex flex-wrap -mx-2">
                    {movies && movies.map((movie, index) => (
                        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-2">
                            <CustomCard movie={movie}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="col grid grid-cols-1 ml-2">
                <div className="flex flex-wrap -mx-2">
                    {series && series.map((movie, index) => (
                        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-2">
                            <CustomCard movie={movie}/>
                        </div>
                    ))}
                </div>
            </div>
            <Pagination total={totalPages} page={page} onChange={onPageChange}/>
        </div>
    );
}

SearchCarousel.propTypes = {
    movies: PropTypes.array.isRequired,
    series: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
}

export default SearchCarousel;