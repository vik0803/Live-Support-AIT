import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'
import { logoutUser } from '../actions/authentication'

class Header extends Component {
	constructor(props) {
		super(props)

		this.handleLogout = this.handleLogout.bind(this)
	}

	handleLogout() {
		this.props.logoutUser()
	}

	render() {
		const isAuthenticated = this.props.auth.isAuthenticated

		/**
		 * Will be displayed if current user is authenticated
		 * Contains username and link to logout the user
		 */
		const userLinks = (
			<React.Fragment>
				<LinkContainer to='/dashboard'>
					<NavItem>{ this.props.auth.user.name }</NavItem>
				</LinkContainer>
				<NavItem onClick={this.handleLogout}>Logout</NavItem>
			</React.Fragment>
		)

		/**
		 * Will be displayed if current user is not authenticated
		 */
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
					<IndexLinkContainer to='/'>
						<Navbar.Brand>Live Support</Navbar.Brand>
					</IndexLinkContainer>
				</Navbar.Header>
				<Nav>
					{ isAuthenticated ? userLinks : guestLinks }
				</Nav>
			</Navbar>
		)
	}
}


const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(Header)
