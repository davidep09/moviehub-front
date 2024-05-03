import {Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input} from "@nextui-org/react";
import SearchIcon from "../components/icons/SearchIcon.jsx";
import {useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import Navigation from "../components/Navigation.jsx";
import {useAuth0} from "@auth0/auth0-react";
import Footer from "../components/Footer.jsx";

function Finder() {
    const {isAuthenticated, isLoading} = useAuth0();
    const navigate = useNavigate();
    if (!isAuthenticated && !isLoading) {
        navigate("/");
    }

    const [searchTerm, setSearchTerm] = useState('');

    const genres = {
        10759: "Acción & Aventura",
        16: "Animación",
        35: "Comedia",
        80: "Crimen",
        99: "Documental",
        18: "Drama",
        10751: "Familia",
        10762: "Niños",
        9648: "Misterio",
        10763: "Noticias",
        10764: "Reality",
        10765: "Ciencia-ficción & Fantasía",
        10766: "Telenovela",
        10767: "Conversación",
        10768: "Guerra & Política",
        37: "Del oeste",
    }
    const [selectedKeysGenre, setSelectedKeysGenre] = useState(new Set([]));
    useMemo(
        () => Array.from(selectedKeysGenre).join(", ").replaceAll("_", " "),
        [selectedKeysGenre]
    );

    const watchProviders = {
        337: "Disney Plus",
        119: "Amazon Prime Video",
        8: "Netflix",
        384: "HBO Max",
        2: "Apple TV",
        63: "Filmin",
        1773: "SkyShowtime",
        149: "Movistar Plus",
        35: "Rakuten TV",
        62: "Atresplayer"
    }
    const [selectedKeysWatchProviders, setSelectedKeysWatchProviders] = useState(new Set([]));
    useMemo(
        () => Array.from(selectedKeysWatchProviders).join(", ").replaceAll("_", " "),
        [selectedKeysWatchProviders]
    );

    const handleClickBuscarPorFiltros = () => {
        navigate(`/search?genre=${Array.from(selectedKeysGenre).join(",")}&watchProviders=${Array.from(selectedKeysWatchProviders).join(",")}`);
    };

    const handleClickBuscarPorPalabra = () => {
        navigate(`/search?term=${searchTerm}`);
    }

    return (
        <>
            <Navigation/>
            <Divider/>
            <h2 className="text-center text-2xl my-6">Buscar por nombre</h2>
            <div className="flex w-1/2 m-auto my-6">
                <Input type="search" placeholder="Buscar película o serie"
                       className="flex-grow"
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button onClick={handleClickBuscarPorPalabra} className="ml-2" variant="flat" color="primary"
                        isIconOnly>
                    <SearchIcon/>
                </Button>
            </div>
            <Divider className="w-[70%] mx-auto"/>
            <h2 className="text-center text-2xl my-6">Buscar por filtros</h2>
            <div className="flex w-1/2 m-auto my-6">
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                            className="capitalize"
                        >
                            Género
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Selecciona uno o varios géneros"
                        variant="flat"
                        closeOnSelect={false}
                        disallowEmptySelection
                        selectionMode="multiple"
                        selectedKeys={selectedKeysGenre}
                        onSelectionChange={setSelectedKeysGenre}
                    >
                        {Object.keys(genres).map((key) => (
                            <DropdownItem key={key} eventKey={key}>
                                {genres[key]}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                            className="capitalize"
                        >
                            Plataforma
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Selecciona una o varias plataformas"
                        variant="flat"
                        closeOnSelect={false}
                        disallowEmptySelection
                        selectionMode="multiple"
                        selectedKeys={selectedKeysWatchProviders}
                        onSelectionChange={setSelectedKeysWatchProviders}
                    >
                        {Object.keys(watchProviders).map((key) => (
                            <DropdownItem key={key} eventKey={key}>
                                {watchProviders[key]}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
                <Button onClick={handleClickBuscarPorFiltros} className="ml-2" variant="flat" color="primary"
                        isIconOnly>
                    <SearchIcon/>
                </Button>
            </div>
            <Footer/>
        </>
    );
}

export default Finder;