import API from 'goals-todos-api'

export const ADD_GOAL = 'ADD_GOAL'
export const REMOVE_GOAL = 'REMOVE_GOAL'
export const TOGGLE_GOAL = 'TOGGLE_GOAL'
export const API_ERROR = 'Aww Snap! Something went wrong! Try again.'

export function addGoal(goal) {
  return {
    type: ADD_GOAL,
    goal
  }
}

export function removeGoal(id) {
  return {
    type: REMOVE_GOAL,
    id
  }
}

export function toggleGoal(id) {
  return {
    type: TOGGLE_GOAL,
    id
  }
}

export function handleDeleteGoal(goal) {
  return dispatch => {
    API.deleteGoal(goal.id).catch(() => {
      dispatch(addGoal(goal))
      alert(API_ERROR)
    })
    dispatch(removeGoal(goal.id))
  }
}

export function handleAddGoal(name, callback) {
  return dispatch => {
    API.saveGoal(name)
      .then(goal => {
        dispatch(addGoal(goal))
        callback()
      })
      .catch(() => {
        alert(API_ERROR)
      })
  }
}
