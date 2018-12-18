import React from 'react'
import PropTypes from 'prop-types'

import RegisterForm from './RegisterForm'


class RegisterPage extends React.Component {
    render() {
        return (
            <div className='row'>
                <div className='col-md-3'>
                </div>
                <div className='col-md-6'>
                    <div className='container'>
                        <h3>Register</h3>
                        <RegisterForm />
                    </div>
                </div>
                <div className='col-md-3'>
                </div>
            </div>
        )
    }
}

export default RegisterPage;
