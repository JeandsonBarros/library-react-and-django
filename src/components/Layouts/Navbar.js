import React, { useEffect, useState } from "react";
import { Navbar, Text, Dropdown, Link } from "@nextui-org/react";
import { NavLink, useNavigate } from "react-router-dom";
import '../styles/Styles.css'
import { BsPerson } from "react-icons/bs";
import { logout, getUser } from '../../services/AuthService';

export default function NavbarCom() {

  const navigate = useNavigate()
  const styleNavLink = (navData) => (navData.isActive ? 'active' : 'noActive')
  const [user, setUser] = useState({ username: '', email: '' })

  useEffect(() => {
    getUser().then(data => { setUser(data) });
  }, [])

  return (

    <Navbar isBordered variant='floating' css={{ zIndex: 900 }}>

      <Navbar.Brand showIn='xs'>
        <Navbar.Toggle aria-label="toggle navigation" />
      </Navbar.Brand>

      <Navbar.Content hideIn="xs">

        <NavLink className={styleNavLink} to="/" end>Livros</NavLink>
        <NavLink className={styleNavLink} to="/clientes/">Clientes</NavLink>
        <NavLink className={styleNavLink} to="/emprestimos/"> Empréstimos </NavLink>

      </Navbar.Content>

      <Navbar.Content>

        <Dropdown placement="bottom-left">

          <Dropdown.Button light >
            <Text size={20}> <BsPerson /> </Text>
          </Dropdown.Button>

          <Dropdown.Menu
            onAction={(value) => {

              if (value === "logout") {
                logout()
                navigate("/login/")
              } else if (value === "count") {
                navigate("/conta/")
              }

            }}
            color="primary"
            aria-label="User Actions">

            <Dropdown.Item key="count">
              Conta: {user.username}
            </Dropdown.Item>

            <Dropdown.Item key="logout" color="error" withDivider>
              Sair
            </Dropdown.Item>

          </Dropdown.Menu>

        </Dropdown>

      </Navbar.Content>

      <Navbar.Collapse showIn='xs'>

        <Navbar.CollapseItem >
          <Link className={styleNavLink} href="/">Livros</Link>
        </Navbar.CollapseItem>

        <Navbar.CollapseItem >
          <Link className={styleNavLink} href="/clientes/">Clientes</Link>
        </Navbar.CollapseItem>

        <Navbar.CollapseItem >
          <Link className={styleNavLink} href="/emprestimos/"> Empréstimos </Link>
        </Navbar.CollapseItem>

      </Navbar.Collapse>

    </Navbar >

  )
}
