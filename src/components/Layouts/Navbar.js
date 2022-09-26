import React from "react";
import { Navbar, Button, Text } from "@nextui-org/react";
import { Link, NavLink } from "react-router-dom";
import '../styles/Styles.css'
import { BsPerson } from "react-icons/bs";

export default function NavbarCom() {

  const variants = ["static", "floating", "sticky"];
  const styleNavLink = (navData) => (navData.isActive ? 'active' : 'noActive')

  return (

    <Navbar isBordered variant='floating' css={{ zIndex: 900 }}>
      
      <Navbar.Content hideIn="xs">

        <NavLink className={styleNavLink} to="/" end>Livros</NavLink>
        <NavLink className={styleNavLink} to="/clientes/">Clientes</NavLink>
        <NavLink className={styleNavLink} to="/emprestimos/"> Empréstimos </NavLink>

      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Item>
          <Button light auto as={Link} href="/">
            <Text size={25} ><BsPerson /></Text>
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>

  )
}
