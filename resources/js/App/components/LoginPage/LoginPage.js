import React, { Component } from 'react'
import LoginForm from './LoginForm'


class LoginPage extends Component {
	render() {
		return (
			<div className='row'>
                <div className='col-md-3'>
                </div>
                <div className='col-md-6'>
                    <div className='container'>
						<h3>Login Now</h3>
						<LoginForm />
					</div>
				</div>
				<div className='col-md-3'>
				</div>
			</div>
		)
	}
}


export default LoginPage
