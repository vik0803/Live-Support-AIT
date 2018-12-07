import React, { Component } from 'react'
import axios from 'axios'
import { Button, Form, FormGroup, Col, FormControl } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authentication'


class LoginPage extends Component {

	constructor(props) {
		super(props)

		this.state = {
			email: '',
			password: '',
			errors: {}
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
	}


	handleInputChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}


	handleSubmit(event) {
		event.preventDefault()

		const user = {
			email: this.state.email,
			password: this.state.password
		}

		this.props.loginUser(user)
	}


	render() {
		return (
			<div>
				<Form horizontal onSubmit={this.handleSubmit}>
					<FormGroup>
						<Col sm={2}>
							Email
						</Col>
					    <Col sm={10}>
					    	<FormControl type='email' placeholder='email' name='email' onChange={this.handleInputChange} />
					    </Col>
					</FormGroup>

					<FormGroup>
						<Col sm={2}>
							Password
						</Col>
					    <Col sm={10}>
					    	<FormControl type='password' name='password' placeholder='Password' onChange={this.handleInputChange} />
					    </Col>
					</FormGroup>

					<Button type='submit'>Login</Button>
				</Form>

				{ this.props.errors && <div>{this.props.errors.error}</div> }
			</div>
		)
	}
}


const mapStateToProps = state => ({
	errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(LoginPage)
