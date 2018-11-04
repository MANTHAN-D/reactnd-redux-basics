import React from 'react'
import { createStore } from 'redux'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './components/App'
import combinedReducer from './reducers/index'
import middleware from './middlewares/index'

const store = createStore(combinedReducer, middleware)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
