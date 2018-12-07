import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import jwt_decode from 'jwt-decode'

import Header from './Header'
import LoginPage from './LoginPage/LoginPage'
import HomePage from './HomePage/HomePage'

import setAuthorizationToken from './setAuthorizationToken'
import { setCurrentUser } from './actions/authentication'


export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />

                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path='/login' component={LoginPage} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}


const store = createStore(rootReducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

if(localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken)
    store.dispatch(setCurrentUser(jwt_decode(localStorage.jwtToken)))
}
else {
    store.dispatch(setCurrentUser({}))
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)