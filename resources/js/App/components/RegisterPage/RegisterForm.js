import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { registerUser } from '../../actions/authentication'
import { addFlashMessage } from '../../actions/flashMessage'


class RegisterForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            fieldErrors: {},
            error: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        }

        this.setState({
            fieldErrors: {}
        })

        this.props.registerUser(user)
            .then(response => {
                this.props.addFlashMessage({
                    type: 'success',
                    message: 'Welcome! You\'ve registered successfully.'
                }, true)
                this.context.router.history.push('/login')
            })
            .catch(error => {
                this.setState({
                    error: error.response.data.message,
                    fieldErrors: error.response.data.errors
                })
            })
    }

    getInputClassName(input) {
        return "form-control" + (this.state.fieldErrors[input] ? ' is-invalid' : '')
    }

    renderFieldErrors(input) {
        return this.state.fieldErrors[input] ?
        <div className='invalid-feedback'>{this.state.fieldErrors[input].map(error => error + ' ')}</div>
        : null
    }

    render () {
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
                        <label htmlFor="inputName">Your name</label>
                        <input type="text" className={this.getInputClassName("name")} id="inputName"
                            name='name' placeholder="Your name" onChange={this.handleInputChange}/>
                        {this.renderFieldErrors("name")}
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputEmail">Email address</label>
                        <input type="email" className={this.getInputClassName("email")}
                            id="inputEmail" name='email' placeholder="Enter email" onChange={this.handleInputChange}/>
                        {this.renderFieldErrors("email")}
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password" className={this.getInputClassName("password")}
                            id="inputPassword" name='password' placeholder="Password" onChange={this.handleInputChange}/>
                        {this.renderFieldErrors("password")}
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPasswordConfirmation">Confirm password</label>
                        <input type="password" className={this.getInputClassName("password")}
                            id="inputPasswordConfirmation" name='password_confirmation' placeholder="Password" onChange={this.handleInputChange}/>
                        {this.renderFieldErrors("password")}
                    </div>

                    <button type='submit' className="btn btn-primary">Register</button>
                </form>

                { errorMessage }

            </React.Fragment>
        )
    }
}

RegisterForm.propTypes = {
    registerUser: PropTypes.func.isRequired
}

RegisterForm.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(null, { registerUser, addFlashMessage })(RegisterForm)
