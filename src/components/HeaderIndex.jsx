import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
} from "@nextui-org/react";
import {useAuth0} from "@auth0/auth0-react";

export default function HeaderIndex() {
    const {loginWithRedirect} = useAuth0();
    return (
        <Navbar className="mt-2">
            <NavbarBrand>
                <h1 className="font-logo text-4xl">Movie<span className="text-primary">Hub</span></h1>
            </NavbarBrand>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button color="default" variant="flat" onPress={() => loginWithRedirect()}>
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
