import React from 'react'
import { connect } from 'react-redux'
import List from './List'

import {
  handleAddTodo,
  handleDeleteTodo,
  handleToggleTodo
} from '../actions/todos'

class Todos extends React.Component {
  addTodo = event => {
    event.preventDefault()
    this.props.dispatch(
      handleAddTodo(this.input.value, () => {
        this.input.value = ''
      })
    )
  }

  toggleTodo = todo => {
    this.props.dispatch(handleToggleTodo(todo.id))
  }

  removeTodo = todo => {
    this.props.dispatch(handleDeleteTodo(todo))
  }

  render() {
    const { todos, loading } = this.props
    return (
      <div>
        <h2>Todo List</h2>
        <input
          type="text"
          name="todo"
          placeholder="Add Todo"
          ref={input => (this.input = input)}
        />
        <button onClick={this.addTodo}>Add Todo</button>
        <List
          items={todos}
          onToggle={this.toggleTodo}
          onRemove={this.removeTodo}
          isLoading={loading}
        />
      </div>
    )
  }
}

export default connect(state => ({
  todos: state.todos,
  loading: state.loading
}))(Todos)
