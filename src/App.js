import React, { Component } from 'react';
import TodoItem from './components/TodoItem';
import './App.css';

function filterCompletedItems (items) {
  return items.filter(item => item.completed)
}

function filterIncompletedItems (items) {
  const incompletedItems = items.filter(item => !item.completed)
  return incompletedItems
}


// UI (view/controller)
class App extends Component {
  // Data (model)
  state = {
    items: [
      { id: 0, description: 'First', completed: true },
      { id: 1, description: 'Second', completed: true },
      { id: 2, description: 'Third', completed: false },
      { id: 4, description: 'Fourth', completed: false },
    ]
  }

  onChangeItemDescriptionAtIndex = (id, description) => {
    this.setState((prevState) => {
      const beforeItems = prevState.items

      const afterItems = beforeItems.map((item, currentIndex) => {
        if(item.id === id) {
          return {
            ...item,
            description: description
          }
        }
        else {
          return item
        }
      })
      return {
        items: afterItems
      }
    })
  }

  onToggleItemAtIndex = (index) => {
    this.setState((prevState) => {
      // Get current items
      const beforeItems = prevState.items

      const afterItems = beforeItems.map((item, currentIndex) => {
        if (currentIndex === index) {
          return {
            ...item,
            completed: !item.completed
          }
        }
        else {
          return item
        }
      })

      return {
        items: afterItems
      }
    })
  }


  render() {
    const items = this.state.items
    const completedItems = filterCompletedItems(items)
    const incompletedItems = filterIncompletedItems(items)

    const total = items.length

    let totalCompleted = 0
    let totalIncomplete = 0
    items.forEach((item) => {
      if (item.completed) {
        totalCompleted++
      }
      else {
        totalIncomplete++
      }
    })

    let statusEmoji = ''
    if (totalIncomplete === 0) {
      statusEmoji = '👏‍ 🎉 👯‍♀️ 🌞'
    }
    else if (totalIncomplete === 1) {
      statusEmoji = '☝️'
    }
    else if (totalIncomplete === 2) {
      statusEmoji = '✌️'
    }
    else if (totalIncomplete === 3) {
      statusEmoji = '🤟'
    }
    else {
      statusEmoji = '🤯'
    }

    return (
      <div className="App">
        <dl>
          <dt>Total</dt>
          <dt>{ total }</dt>
        </dl>
        <dl>
          <dt>Total Completed</dt>
          <dt>{ totalCompleted }</dt>
        </dl>
        <dl>
          <dt>Total Incomplete</dt>
          <dt>{ totalIncomplete }</dt>
          <dt>{ statusEmoji }</dt>
        </dl>
        <h1>completed</h1>
        {
          completedItems.map((item) => (
            <TodoItem 
              key={item.id}
              description={ item.description }
              completed={ item.completed }
              onToggleCompleted={
                () => {
                  console.log('TodoItem onToggleCompleted received', item.id)
                  this.onToggleItemAtIndex(item.id)
                }
              }
              editDescription={
                () => {
                  console.log('Its doing something')
                  this.onChangeItemDescriptionAtIndex(item.id, document.getElementById("edit").value)
                }
              }
            />
          ))
        }
        <h1>Incompleted</h1>
        {
          incompletedItems.map((item) => (
            <TodoItem 
              key={item.id}
              description={ item.description }
              completed={ item.completed }
              onToggleCompleted={
                () => {
                  console.log('TodoItem onToggleCompleted received', item.id)
                  this.onToggleItemAtIndex(item.id)
                }
              }
              editDescription={
                () => {
                  this.onChangeItemDescriptionAtIndex(item.id, document.getElementById("edit").value)
                }
              }
            />
          ))
        }
      </div>
    );
  }
}

export default App;
