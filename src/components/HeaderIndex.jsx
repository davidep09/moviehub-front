import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
} from "@nextui-org/react";
import Logo from "./Logo";

export default function HeaderIndex() {
    return (
        <Navbar className="mt-2">
            <NavbarBrand>
                <h1 className="text-xl">Movie<span className="text-primary">Hub</span></h1>
            </NavbarBrand>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button as={Link} color="default" href="/login" variant="flat">
                        Iniciar sesión
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Registrarse
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
