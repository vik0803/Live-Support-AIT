import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';


export default function renderAuthComponent(Component, authType) {
    class Authenticate extends React.Component {

        componentDidMount() {
            this.checkAndRedirect()
        }

        componentDidUpdate() {
            this.checkAndRedirect()
        }

        /**
         * Checks based on auth type if client is allowed to view page. If not, redirect.
         * @method checkAndRedirect
         */
        checkAndRedirect() {
            if(!this.props.isAuthenticated && authType == 'user') {
                this.context.router.history.push('/')
            }
            else if(this.props.isAuthenticated && authType == 'guest') {
                this.context.router.history.push('/')
            }
        }

        /**
         * Render component
         * @method render
         */
        render() {
            return(
                <Component {...this.props} />
            )
        }
    }

    Authenticate.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        authType: PropTypes.oneOf(['user', 'guest']).isRequired
    }

    Authenticate.contextTypes = {
        router: PropTypes.object.isRequired
    }

    const mapStateToProps = state => ({
        isAuthenticated: state.auth.isAuthenticated
    })

    return connect(mapStateToProps)(Authenticate)
}
