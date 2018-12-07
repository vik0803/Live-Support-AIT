import axios from 'axios'
import { GET_ERRORS, SET_CURRENT_USER } from './types'
import setAuthorizationToken from '../utils/setAuthorizationToken'
import jwt_decode from 'jwt-decode'


export const setCurrentUser = (user) => {
	return {
		type: SET_CURRENT_USER,
		user: user
	}
}


export const loginUser = user => dispatch => {
	axios.post('/api/auth/login', user)
		.then(response => {
			const token = response.data.access_token
			localStorage.setItem('jwtToken', token)
			setAuthorizationToken(token)

			dispatch(setCurrentUser(jwt_decode(token)))
		})
		.catch(error => {
			dispatch({
				type: GET_ERRORS,
				payload: error.response.data
			})
		})
}
