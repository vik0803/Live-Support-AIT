import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class Header extends Component {
	constructor(props) {
		super(props)

		this.handleLogout = this.handleLogout.bind(this)
	}

	handleLogout() {
		console.log("Logout!")
	}

	render() {
		const isAuthenticated = this.props.auth.isAuthenticated

		const userLinks = (
			<React.Fragment>
				<NavItem>{ this.props.auth.user.name }</NavItem>
				<NavItem onClick={this.logout}>
					Logout
				</NavItem>
			</React.Fragment>
		)

		const guestLinks = (
			<React.Fragment>
				<LinkContainer to='/register'>
					<NavItem>Register</NavItem>
				</LinkContainer>
				<LinkContainer to='/login'>
					<NavItem>Login</NavItem>
				</LinkContainer>
			</React.Fragment>
		)

		return (
			<Navbar inverse staticTop>
				<Navbar.Header>
					<Navbar.Brand>Live Support</Navbar.Brand>
				</Navbar.Header>
				<Nav>
					{ isAuthenticated ? userLinks : guestLinks }
					<LinkContainer to='/'>
						<NavItem>Home</NavItem>
					</LinkContainer>
				</Nav>
			</Navbar>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps)(Header)
