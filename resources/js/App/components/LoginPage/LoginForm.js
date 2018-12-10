import React, { Component } from 'react'
import axios from 'axios'
import { Button, Form, FormGroup, Col, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authentication'
import PropTypes from 'prop-types';


class LoginForm extends Component {
    constructor(props) {
		super(props)

		this.state = {
			email: '',
			password: '',
			error: '',
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
			.then(response => {
				this.setState({
					error: ""
				})
                this.context.router.history.push('/dashboard')
			})
			.catch(error => {
				this.setState({
					error: "Login failed!"
				})
			})
	}

    render() {
        return (
            <React.Fragment>
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

                { this.state.error && <div>{this.state.error}</div> }
            </React.Fragment>
        )
    }
}

LoginForm.propTypes = {
    loginUser: PropTypes.func.isRequired
}

LoginForm.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(null, { loginUser })(LoginForm)
