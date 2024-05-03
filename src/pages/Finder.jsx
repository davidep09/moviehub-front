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

    const [selectedGenre, setSelectedGenre] = useState(new Set(["Género"]));
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

    const selectedValueGenre = useMemo(
        () => Array.from(selectedGenre).join(", ").replaceAll("_", " "),
        [selectedGenre]
    );

    const handleClickBuscar = () => {
        navigate(`/search/${searchTerm}`);
    };

    return (
        <>
            <Navigation/>
            <Divider/>
            <h1 className="text-center text-2xl my-6">Buscar</h1>
            <div className="flex w-1/2 m-auto my-6">
                <Input type="search" placeholder="Buscar película o serie"
                       className="flex-grow"
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button onClick={handleClickBuscar} className="ml-2" variant="flat" color="primary"
                        disabled={!searchTerm}
                        isIconOnly>
                    <SearchIcon/>
                </Button>
            </div>
            <div className="flex w-1/2 m-auto my-6">
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                            className="capitalize"
                        >
                            {selectedValueGenre}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Single selection example"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="multiple"
                        selectedKeys={selectedGenre}
                        onSelectionChange={setSelectedGenre}
                    >
                        {Object.entries(genres).map(([key, value]) => (
                            <DropdownItem key={key} eventKey={key}>
                                {value}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </div>
            <Footer/>
        </>
    );
}

export default Finder;