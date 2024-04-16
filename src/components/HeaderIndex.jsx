import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
} from "@nextui-org/react";
import Logo from "./Logo";
import {useAuth0} from "@auth0/auth0-react";

export default function HeaderIndex() {
    const {loginWithRedirect} = useAuth0();
    const handleSubmit = () => {
        loginWithRedirect().then(r => console.log(r)).catch(e => console.error(e));
    };
    return (
        <Navbar className="mt-2">
            <NavbarBrand>
                <h1 className="text-xl">Movie<span className="text-primary">Hub</span></h1>
            </NavbarBrand>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button color="default" variant="flat" onPress={handleSubmit}>
                        Iniciar sesión
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="primary" href="/register" variant="flat">
                        Registrarse
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
