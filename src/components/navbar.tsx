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

interface Props {
  url_logo: string;
  page: string;
}

const NavBar: React.FC<Props> = ({ url_logo, page }) => {
  return (
    <Navbar>
      <NavbarBrand className="p-4">
        <Image
          isBlurred
          src={url_logo}
          alt="Logo des equipes"
          width={45}
          radius="none"
        />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={page == "/teams"}>
          <Link
            color={page == "/teams" ? "primary" : "foreground"}
            href="/teams"
          >
            Les Équipes
          </Link>
        </NavbarItem>
        <NavbarItem isActive={page == "/"}>
          <Link color={page == "/" ? "primary" : "foreground"} href="/">
            Accueil
          </Link>
        </NavbarItem>
        <NavbarItem isActive={page == "/players"}>
          <Link
            color={page == "/players" ? "primary" : "foreground"}
            href="/players"
          >
            Les joueurs
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end"></NavbarContent>
    </Navbar>
  );
};

export default NavBar;
