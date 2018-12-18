import { ADD_FLASH_MESSAGE, CLEAR_FLASH_MESSAGE } from './types'
import shortid from 'shortid'
import { toast } from 'react-toastify'


export const addFlashMessage = (payload, showMessage=true) => dispatch => {
    const messageID = shortid.generate()
    dispatch({
        type: ADD_FLASH_MESSAGE,
        payload: {
            id: messageID,
            type: payload.type,
            message: payload.message
        }
    })

    if(showMessage) {
        const options = {
            autoClose: 5000,
            closeOnClick: true,
            type: toast.TYPE.SUCCESS,
            position: "bottom-left",
            hideProgressBar: true,
            draggable: false,
            onClose: () => {
                dispatch({
                        type: CLEAR_FLASH_MESSAGE,
                        payload: {
                            id: messageID
                        }
                    })
            }
        }
        toast.success(payload.message, options)
    }
}

export const clearFlashMessage = messageId => dispatch => {
    return {
        type: CLEAR_FLASH_MESSAGE,
        payload: {
            id: messageId
        }
    }
}
