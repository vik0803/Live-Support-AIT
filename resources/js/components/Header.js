import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => (
	<Navbar inverse staticTop>
		<Navbar.Header>
			<Navbar.Brand>Live Support</Navbar.Brand>
		</Navbar.Header>
		<Nav>
			<LinkContainer to='/'>
				<NavItem>Home</NavItem>
			</LinkContainer>
			<LinkContainer to='/login'>
				<NavItem>Login</NavItem>
			</LinkContainer>
		</Nav>
	</Navbar>
)


export default Header