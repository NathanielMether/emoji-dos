import React from 'react'

function TodoItem ({
  description,
  completed = false,
  onToggleCompleted,
  editDescription
}) {
  if (completed) {
    return (
      <label>
        <button onClick={
            (event) => { // Event listener
              console.log('Clicked checkbox', description)
              // Notify the powers above that the concept of completed has changed
              onToggleCompleted()
            }
          }>
          <span>✅</span>
        </button>
        { description }
      <input 
        type='text'
        id='edit'
        onBlur={
          (event) => {
            editDescription()
          }
        }
      />
      </label>
    )
  }
  else {
    return (
      <label>
        <button onClick={
            (event) => { // Event listener
              console.log('Clicked checkbox', description)
              // Notify the powers above that the concept of completed has changed
              onToggleCompleted()
            }
          }>
          <span>❎</span>
        </button>
        { description }
      <input 
        type='text'
        id='edit'
        onChange={
          (event) => {
            editDescription()
          }
        }
      />
      </label>
    )
  }
}

export default TodoItem