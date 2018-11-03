import API from 'goals-todos-api'

export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const API_ERROR = 'Aww Snap! Something went wrong! Try again.'

export function addTodo(todo) {
  return {
    type: ADD_TODO,
    todo
  }
}

export function removeTodo(id) {
  return {
    type: REMOVE_TODO,
    id
  }
}

export function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    id
  }
}

export function handleDeleteTodo(todo) {
  return dispatch => {
    dispatch(removeTodo(todo.id))
    API.deleteTodo(todo.id).catch(() => {
      dispatch(addTodo(todo))
      alert(API_ERROR)
    })
  }
}

export function handleAddTodo(name, callback) {
  return dispatch => {
    API.saveTodo(name)
      .then(todo => {
        dispatch(addTodo(todo))
        callback()
      })
      .catch(() => {
        alert(API_ERROR)
      })
  }
}

export function handleToggleTodo(id) {
  return dispatch => {
    API.saveTodoToggle(id).catch(() => {
      dispatch(toggleTodo(id))
      alert(API_ERROR)
    })
    dispatch(toggleTodo(id))
  }
}
