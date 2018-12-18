import { ADD_FLASH_MESSAGE, CLEAR_FLASH_MESSAGE } from '../actions/types'


const initialState = {
    messages: []
}

export default function (state=initialState, action) {
    switch(action.type) {
        case ADD_FLASH_MESSAGE:
            return {
                messages: [
                    ...state.messages,
                    {
                        id: action.payload.id,
                        type: action.payload.type,
                        message: action.payload.message
                    }
                ]
            }
        case CLEAR_FLASH_MESSAGE:
            return {
                messages: state.messages.filter(message => message.id !== action.payload.id)
            }
        default:
            return state
    }
}
