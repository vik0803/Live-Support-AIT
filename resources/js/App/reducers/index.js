import { combineReducers } from 'redux'
import authReducer from './authReducer'
import flashMessageReducer from './flashMessageReducer'

export default combineReducers({
   auth: authReducer,
   flashMessages: flashMessageReducer
})
