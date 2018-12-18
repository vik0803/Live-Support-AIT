import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';


const renderAuthComponent = (Component, authType='user') => {
    class Authenticate extends React.Component {
        constructor(props, context) {
            super(props)

            if(!props.isAuthenticated && authType == 'user') {
                context.router.history.push('/')
            }
            else if(props.isAuthenticated && authType == 'guest') {
                context.router.history.push('/')
            }
        }

        componentDidMount() {
            this.checkAndRedirect()
        }

        componentDidUpdate() {
            this.checkAndRedirect()
        }

        /**
         * Checks if client is allowed to view page based on auth type. If not, redirect.
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
        isAuthenticated: PropTypes.bool.isRequired
    }

    Authenticate.contextTypes = {
        router: PropTypes.object.isRequired
    }

    const mapStateToProps = state => ({
        isAuthenticated: state.auth.isAuthenticated
    })

    return connect(mapStateToProps)(Authenticate)
}

// renderAuthComponent.propTypes = {
//     Component: PropTypes.element.isRequired,
//     authType: PropTypes.oneOf(['user', 'guest']).isRequired
// }

export default renderAuthComponent
