import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'

import Header from './Header'
import LoginPage from './LoginPage/LoginPage'
import HomePage from './HomePage/HomePage'


export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />

                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path='/login' component={LoginPage} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}


const store = createStore(rootReducer, compose(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)
