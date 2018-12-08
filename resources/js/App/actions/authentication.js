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

/**
 * Logs in user by:
 * - sending a POST request with mail and password to the API to login the user
 * - save the JWT token that the API returned to the localStorage
 * - set the token as default header for the axios requests
 * - storing the decoded token in the Redux store
 * @method loginUser
 * @param  user  object containing email and password
 */
export const loginUser = user => dispatch => {
	return axios.post('/api/auth/login', user)
		.then(response => {
			const token = response.data.access_token
			localStorage.setItem('jwtToken', token)
			setAuthorizationToken(token)

			dispatch(setCurrentUser(jwt_decode(token)))
		})
}

/**
 * Logs out the user by:
 * - sending a POST request to the API to logout the user,
 * - deleting the JWT token from the localStorage,
 * - removing the JWT token from the standard Axios headers
 * - resetting the current user in the Redux store,
 * - and redirecting to the HomePage
 * @method logoutUser
 */
export const logoutUser = () => dispatch => {
	axios.post('/api/auth/logout')
		.then(response => {
			localStorage.removeItem('jwtToken')
			setAuthorizationToken(false)
			dispatch(setCurrentUser({}))
		})
		.catch(error => {
			dispatch({
				type: GET_ERRORS,
				payload: error.response.data
			})
		})
}
