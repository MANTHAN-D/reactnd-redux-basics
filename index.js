/** Library Code */
function createStore(reducer) {
  // Contains following
  // 1. state
  // 2. getter
  // 3. state change listner
  // 4. updater

  let state
  let listeners = []

  // 2
  const getState = () => state

  // 3
  const subscribe = listener => {
    listeners.push(listener)
    //returns a function to allow unsubscription
    return () => {
      listeners = listeners.filter(l => l != listener)
    }
  }

  // 4
  const dispatch = action => {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }

  return {
    getState,
    subscribe,
    dispatch
  }
}

/** App Code - User defines such functions */

const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'
const TOGGLE_GOAL = 'TOGGLE_GOAL'

// Reducer function - Reduces input state and reduces it to new state
// Must be a pure function
// Must return new state rather than mutated state
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo])
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id)
    case TOGGLE_TODO:
      return state.map(
        todo =>
          todo.id !== action.id
            ? todo
            : Object.assign({}, todo, { complete: !todo.complete })
      )
    default:
      return state
  }
}

function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal])
    case REMOVE_GOAL:
      return state.filter(goal => goal.id !== action.id)
    case TOGGLE_GOAL:
      return state.map(
        goal =>
          goal.id !== action.id
            ? goal
            : Object.assign({}, goal, { complete: !goal.complete })
      )
    default:
      return state
  }
}

function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action)
  }
}

// Action Creators

function addTodoAction(todo) {
  return {
    type: ADD_TODO,
    todo
  }
}

function removeTodoAction(id) {
  return {
    type: REMOVE_TODO,
    id
  }
}

function toggleTodoAction(id) {
  return {
    type: TOGGLE_TODO,
    id
  }
}

function addGoalAction(goal) {
  return {
    type: ADD_GOAL,
    goal
  }
}

function removeGoalAction(id) {
  return {
    type: REMOVE_GOAL,
    id
  }
}

function toggleGoalAction(id) {
  return {
    type: TOGGLE_GOAL,
    id
  }
}

// Here todos is the user defined reducer function
const store = createStore(app)

// Register listener
store.subscribe(() => {
  console.log('The new state is: ', store.getState())
})

// Dispatch action - todos
store.dispatch(
  addTodoAction({
    id: 0,
    name: 'Read book',
    complete: false
  })
)

store.dispatch(
  addTodoAction({
    id: 1,
    name: 'Read book 2',
    complete: true
  })
)

// Dispatch new actions - todos
store.dispatch(removeTodoAction(0))

store.dispatch(toggleTodoAction(1))

// Dispatch action - goals

store.dispatch(
  addGoalAction({
    id: 0,
    name: 'WAlk',
    complete: false
  })
)

store.dispatch(
  addGoalAction({
    id: 1,
    name: 'Go to gym',
    complete: true
  })
)

// Dispatch new actions - goals
store.dispatch(removeGoalAction(1))

store.dispatch(toggleGoalAction(0))
