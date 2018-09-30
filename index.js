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
// Reducer function - Reduces input state and reduces it to new state
// Must be a pure function
// Must return new state rather than mutated state
function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.todo])
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.id)
    case 'TOGGLE_TODO':
      return state.map(
        todo =>
          todo.id !== action.id
            ? todo
            : Object.assign({}, todo, { complete: !todo.complete })
      )
  }
  return state
}

// Here todos is the user defined reducer function
const store = createStore(todos)

// Register listener
store.subscribe(() => {
  console.log('The new state is: ', store.getState())
})

// Dispatch action
store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Read book'
  }
})

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 1,
    name: 'Read book'
  }
})
