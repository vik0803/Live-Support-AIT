import axios from 'axios'

/**
 * Sets default Axios headers to include the JWT token
 * @method setAuthorizationToken
 * @param  string    token   JWT token
 */
const setAuthorizationToken = token => {
	if(token) {
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
	}
	else {
		delete axios.defaults.headers.common['Authorization']
	}
}


export default setAuthorizationToken
