import CustomCard from "./CustomCard.jsx";
import PropTypes from "prop-types";

function TrendsCarousel({trends}) {
    if (!Array.isArray(trends)) {
        return <p>Las tendencias no están disponibles</p>;
    }

    return (
        <>
            <h2 className="text-2xl text-center mt-4">Tendencias de MovieHub</h2>
            <div className="flex flex-col sm:flex-row flex-wrap">
                {/* eslint-disable-next-line react/prop-types */}
                {trends && trends.map((trend, index) => (
                    <div key={index} className="w-full sm:w-1/5 p-4">
                        <CustomCard movie={trend}/>
                    </div>
                ))}
            </div>
        </>
    )
}

TrendsCarousel.propTypes = {
    trends: PropTypes.array.isRequired
}

export default TrendsCarousel;