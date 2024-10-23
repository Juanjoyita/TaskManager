// components/Header.tsx

"use client";

import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, Button } from "@nextui-org/react"; // Asegúrate de que NextUI esté instalado

const Header = () => {
  return (
    <Navbar>
      <NavbarBrand>
        <h1 className="text-lg font-bold"></h1>
      </NavbarBrand>
      <NavbarContent>
        <Button color="primary">Iniciar Sesión</Button>
        <Button color="secondary">Registrarse</Button>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
