import React from 'react'

const List = props => {
  return props.isLoading ? (
    <div className="loader" />
  ) : (
    <ul>
      {props.items &&
        props.items.map(item => (
          <li
            key={item.id}
            style={{ textDecoration: item.complete ? 'line-through' : '' }}
            onClick={() => props.onToggle(item)}
          >
            {item.name}
            <button onClick={() => props.onRemove(item)}>X</button>
          </li>
        ))}
    </ul>
  )
}

export default List
