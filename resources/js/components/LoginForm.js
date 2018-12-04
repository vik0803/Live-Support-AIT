import React, { Component } from 'react'
import axios from 'axios'
import { Button, Form, FormGroup, Col, FormControl } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'


class LoginForm extends Component {
	
	constructor() {
		super()

		this.state = {
			email: '',
			password: '',
			errors: []
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

		const login = {
			email: this.state.email,
			password: this.state.password
		}

		axios.post('/api/auth/login', login)
			.then(response => {
				console.log('Successfully logged in!')
				this.props.history.push('/')
			})
			.catch(error => {
				this.setState({
					errors: error
				})
			})
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

				<strong>{this.state.errors ? this.state.errors.toString() : ''}</strong>

			</div>
		)
	}
}


export default LoginForm