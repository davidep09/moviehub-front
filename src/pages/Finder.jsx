import {Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input} from "@nextui-org/react";
import SearchIcon from "../components/icons/SearchIcon.jsx";
import {useMemo, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import Navigation from "../components/Navigation.jsx";
import {useAuth0} from "@auth0/auth0-react";

function Finder() {
    const {isAuthenticated, isLoading} = useAuth0();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [selectedGenre, setSelectedGenre] = useState(new Set(["Género"]));

    const selectedValue = useMemo(
        () => Array.from(selectedGenre).join(", ").replaceAll("_", " "),
        [selectedGenre]
    );

    const handleClick = () => {
        navigate(`/search/${searchTerm}`);
    };

    if (!isAuthenticated && !isLoading) {
        return <Navigate to="/"/>;
    }

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
                <Button onClick={handleClick} className="ml-2" variant="flat" color="primary" disabled={!searchTerm}
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
                            {selectedValue}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Single selection example"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedGenre}
                        onSelectionChange={setSelectedGenre}
                    >
                        <DropdownItem key="action">Acción</DropdownItem>
                        <DropdownItem key="animation">Animación</DropdownItem>
                        <DropdownItem key="comedy">Comedia</DropdownItem>
                        <DropdownItem key="documentary">Documental</DropdownItem>
                        <DropdownItem key="drama">Drama</DropdownItem>
                        <DropdownItem key="family">Familiar</DropdownItem>
                        <DropdownItem key="fantasy">Fantasía</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </>
    );
}

export default Finder;