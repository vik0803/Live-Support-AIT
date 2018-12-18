import React, { Component }  from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


class FlashMessagesList extends Component {
    render() {
        return(
            this.props.messages.map(message => (
                <div className='alert alert-dismissible alert-success'>
                  <button type="button" class="close">&times;</button>
                  {message.message}
                </div>
            ))
        )
    }
}

const mapStateToProps = state => ({
    messages: state.flashMessages.messages
})

FlashMessagesList.propTypes = {
    messages: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(FlashMessagesList)
