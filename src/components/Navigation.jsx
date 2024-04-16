import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    User, Dropdown, DropdownMenu, DropdownItem, DropdownTrigger, Spacer, NavbarMenuToggle, NavbarMenu, NavbarMenuItem,
} from "@nextui-org/react";

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <Navbar className="mt-2" shouldHideOnScroll>

            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
            />

            <NavbarBrand>
                <h1 className="font-logo text-4xl">Movie<span className="text-primary">Hub</span></h1>
            </NavbarBrand>

            <NavbarContent justify="center" className="hidden sm:flex">
                <NavbarItem>
                    <Link href="/home" size="lg">Inicio</Link>
                </NavbarItem>
                <Spacer x={1}/>
                <NavbarItem>
                    <Link href="#" size="lg">Novedades</Link>
                </NavbarItem>
                <Spacer x={1}/>
                <NavbarItem>
                    <Link href="/trends" size="lg">Tendencias</Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <User
                                name="Jane Doe"
                                description="Product Designer"
                                avatarProps={{
                                    src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                                }}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Acciones" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Sesión iniciada como:</p>
                                <p className="font-semibold">zoey@example.com</p>
                            </DropdownItem>
                            <DropdownItem key="listas">Mis listas</DropdownItem>
                            <DropdownItem key="ajustes">Ajustes</DropdownItem>
                            <DropdownItem key="logout" color="danger">
                                Cerrar sesión
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                <NavbarMenuItem>
                    <Link href="/home" size="lg">Inicio</Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link href="#" size="lg">Novedades</Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link href="/trends" size="lg">Tendencias</Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
}
