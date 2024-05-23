import tmdbLogo from '../assets/images/tmdb-logo.png';
import justWatchLogo from '../assets/images/justwach-logo.png';

function Footer() {
    return (
        <footer className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div>
                    <h1 className="font-logo text-4xl">Movie<span className="text-primary">Hub</span></h1>
                    <p className="text-sm">Tu lugar para encontrar información sobre tus películas y series
                        favoritas</p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-sm font-semibold md:mb-0 md:mr-2">Powered by:</p>
                    <img src={tmdbLogo} alt="L  ogo de TMDB"
                         className="w-24 md:w-32 mb-2 md:mb-0 md:mr-2 object-contain"/>
                    <img src={justWatchLogo} alt="Logo de JustWatch" className="w-24 md:w-32 object-contain"/>
                </div>
            </div>
        </footer>
    );
}

export default Footer;