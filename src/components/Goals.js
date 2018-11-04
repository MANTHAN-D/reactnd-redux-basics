import React from 'react'
import { connect } from 'react-redux'
import List from './List'

import { handleAddGoal, handleDeleteGoal, toggleGoal } from '../actions/goals'

class Goals extends React.Component {
  addGoal = event => {
    event.preventDefault()
    this.props.dispatch(
      handleAddGoal(this.input.value, () => {
        this.input.value = ''
      })
    )
  }

  toggleGoal = goal => {
    this.props.dispatch(toggleGoal(goal.id))
  }

  removeGoal = goal => {
    this.props.dispatch(handleDeleteGoal(goal))
  }

  render() {
    const { goals, loading } = this.props
    return (
      <div>
        <h2>Goals</h2>
        <input
          type="text"
          name="goal"
          placeholder="Add Goal"
          ref={input => (this.input = input)}
        />
        <button onClick={this.addGoal}>Add Goal</button>
        <List
          items={goals}
          onToggle={this.toggleGoal}
          onRemove={this.removeGoal}
          isLoading={loading}
        />
      </div>
    )
  }
}

export default connect(state => ({
  goals: state.goals,
  loading: state.loading
}))(Goals)
