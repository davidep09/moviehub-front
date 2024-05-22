import {Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input} from "@nextui-org/react";
import SearchIcon from "../components/icons/SearchIcon.jsx";
import {useMemo, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import Navigation from "../components/Navigation.jsx";
import {useAuth0} from "@auth0/auth0-react";
import Footer from "../components/Footer.jsx";

function Finder() {
    const {isAuthenticated, isLoading} = useAuth0();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');

    const types = {
        'movie': 'Películas',
        'tv': 'Series'
    }
    const [selectedKeysType, setSelectedKeysType] = useState(new Set([]));
    useMemo(
        () => Array.from(selectedKeysType).join(", ").replaceAll("_", " "),
        [selectedKeysType]
    );

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

    const sortBy = {
        "popularity.desc": "Popularidad",
        "vote_average.desc": "Valoración",
        "primary_release_date.desc": "Fecha de estreno más reciente",
        "primary_release_date.asc": "Fecha de estreno más antigua",
        "title.desc": "Título"
    }
    const [selectedKeysSortBy, setSelectedKeysSortBy] = useState(new Set([]));
    useMemo(
        () => Array.from(selectedKeysSortBy).join(", ").replaceAll("_", " "),
        [selectedKeysSortBy]
    );

    const handleClickBuscarPorFiltros = () => {
        navigate(`/search?sortBy=${Array.from(selectedKeysSortBy)}&type=${Array.from(selectedKeysType)}&genre=${Array.from(selectedKeysGenre).join(",")}&watchProviders=${Array.from(selectedKeysWatchProviders).join(",")}`);
    };

    const handleClickBuscarPorPalabra = () => {
        navigate(`/search?term=${searchTerm}`);
    }

    if (!isAuthenticated && !isLoading) {
        return <Navigate to={"/"}/>;
    }

    return (
        <>
            <Navigation/>
            <Divider/>
            <h2 className="text-center text-2xl my-6">Buscar por nombre</h2>
            <div className="flex w-1/2 m-auto my-6">
                <Input type="search" placeholder="Buscar película o serie"
                       variant="flat"
                       color="default"
                       className="flex-grow"
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button onClick={handleClickBuscarPorPalabra} className="ml-2" variant="flat" color="primary"
                        isIconOnly isDisabled={searchTerm === ''}>
                    <SearchIcon/>
                </Button>
            </div>
            <Divider className="w-[70%] mx-auto"/>
            <h2 className="text-center text-2xl my-6">Buscar por filtros</h2>
            <div className="flex w-1/2 m-auto my-6 justify-center">
                <div className="mx-1">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="flat"
                                className="capitalize"
                                color="default"
                            >
                                Tipo
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Selecciona un tipo"
                            variant="flat"
                            closeOnSelect={false}
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedKeysType}
                            onSelectionChange={setSelectedKeysType}
                            required
                        >
                            {Object.keys(types).map((key) => (
                                <DropdownItem key={key} eventKey={key}>
                                    {types[key]}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className="mx-1">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="flat"
                                className="capitalize"
                                color="default"
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
                </div>
                <div className="mx-1">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="flat"
                                className="capitalize"
                                color="default"
                            >
                                Plataforma
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Selecciona una plataforma"
                            variant="flat"
                            closeOnSelect={false}
                            disallowEmptySelection
                            selectionMode="single"
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
                </div>
                <div className="mx-1">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="flat"
                                className="capitalize"
                                color="default"
                            >
                                Ordenar
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Selecciona una o varias plataformas"
                            variant="flat"
                            closeOnSelect={false}
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedKeysSortBy}
                            onSelectionChange={setSelectedKeysSortBy}
                        >
                            {Object.keys(sortBy).map((key) => (
                                <DropdownItem key={key} eventKey={key}>
                                    {sortBy[key]}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <Button onClick={handleClickBuscarPorFiltros} className="ml-2" variant="flat" color="primary"
                        isIconOnly isDisabled={selectedKeysType.size === 0}>
                    <SearchIcon/>
                </Button>
            </div>
            <Footer/>

        </>
    );
}

export default Finder;