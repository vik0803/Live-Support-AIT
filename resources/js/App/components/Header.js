import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'
import { logoutUser } from '../actions/authentication'
import PropTypes from 'prop-types'


class Header extends Component {
	constructor(props) {
		super(props)

		this.handleLogout = this.handleLogout.bind(this)
	}

	handleLogout(event) {
		event.preventDefault()

		this.props.logoutUser()
			.then(response => {
				this.context.router.history.push('/')
			})
			.catch(error => {
				this.context.router.history.push('/login')
			})
	}

	render() {
		const isAuthenticated = this.props.auth.isAuthenticated

		/**
		 * Will be displayed if current user is authenticated
		 * Contains username and link to logout the user
		 */
		const userLinks = (
			<React.Fragment>
				<li className="nav-item">
					<Link to='/dashboard' className='nav-link'>
						{ this.props.auth.user.name }
					</Link>
				</li>
				<li className="nav-item">
					<a href="#" onClick={this.handleLogout} className='nav-link'>
						Logout
					</a>
				</li>
			</React.Fragment>
		)

		/**
		 * Will be displayed if current user is not authenticated
		 */
		const guestLinks = (
			<React.Fragment>
				<li className="nav-item">
					<Link to='/register' className='nav-link'>
						Register
					</Link>
				</li>
				<li className="nav-item">
					<Link to='/login' className='nav-link'>
						Login
					</Link>
				</li>
			</React.Fragment>
		)

		return (
			<div className='navbar navbar-expand-lg navbar-dark bg-primary'>
				<Link to='/' className='navbar-brand'>
					Live Support
				</Link>
				<div className='collapse navbar-collapse'>
					<ul className="navbar-nav mr-auto">
						{ isAuthenticated ? userLinks : guestLinks }
					</ul>
				</div>
			</div>
		)
	}
}

Header.propTypes = {
	auth: PropTypes.object.isRequired
}

Header.contextTypes = {
	router: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(Header)
