import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './redux/reducers'
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import AppRoute from './router/router';
import './assets/scss/app.scss'


const store = createStore(
    reducer,
    {},
    compose(
        applyMiddleware(reduxThunk),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && 
        // window.__REDUX_DEVTOOLS_EXTENSION__()
    ),
)

ReactDom.render(
    <Provider store={store}>
        <AppRoute />
    </Provider>,
    document.getElementById('app')
)

