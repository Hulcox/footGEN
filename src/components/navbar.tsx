import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { Image } from "@nextui-org/react";

const NavBar = () => {
  return (
    <Navbar>
      <NavbarBrand className="p-4">
        <Image
          isBlurred
          src={"/images/logos/barca.svg"}
          alt="Logo des equipes"
          width={50}
          radius="none"
        />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Les Équipes
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Accueil
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Les joueurs
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end"></NavbarContent>
    </Navbar>
  );
};

export default NavBar;
