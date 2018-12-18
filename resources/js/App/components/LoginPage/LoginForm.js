import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authentication'
import { addFlashMessage } from '../../actions/flashMessage'
import PropTypes from 'prop-types'


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
        this.clearError = this.clearError.bind(this)
	}

    clearError() {
        this.setState({
            error: ""
        })
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
                this.props.addFlashMessage({
                    type: 'success',
                    message: 'Signed in successfully.'
                }, true)
                this.context.router.history.push('/dashboard')
			})
			.catch(error => {
				this.setState({
					error: "Login failed. Please try again."
				})
			})
	}

    render() {
        const errorMessage = (this.state.error ?
            <div className='alert alert-dismissible alert-danger'>
                <button type='button' className='close' onClick={this.clearError}>&times;</button>
                { this.state.error }
            </div>
            : null
        )
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="inputEmail">Email address</label>
                        <input type="email" className="form-control" id="inputEmail" name='email' placeholder="Enter email" onChange={this.handleInputChange}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password" className="form-control" id="inputPassword" name='password' placeholder="Password" onChange={this.handleInputChange}/>
                    </div>

                    <button type='submit' className="btn btn-primary">Login</button>
                </form>

                { errorMessage }

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

export default connect(null, { loginUser, addFlashMessage })(LoginForm)
