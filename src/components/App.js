import React from 'react'
import { connect } from 'react-redux'
import Goals from './Goals'
import Todos from './Todos'

import { handleInitialData } from '../actions/shared'

class App extends React.Component {
  componentDidMount = () => {
    const { dispatch } = this.props

    // Fetch and log all todos and goals
    dispatch(handleInitialData())
  }

  render() {
    return (
      <div>
        <h1>React App using Redux Lib</h1>
        <Todos />
        <Goals />
      </div>
    )
  }
}

export default connect(state => {})(App)
