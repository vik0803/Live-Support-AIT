import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './Header'
import LoginForm from './LoginForm'
import Home from './Home'


export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />

                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path='/login' component={LoginForm} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('app'))
