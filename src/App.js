import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"

import Item from "./components/Item"
import draggable from "./hoc/draggable"

const DragItem = draggable(Item)

function moveInArray(from, to, array) {
  return array.concat(array.splice(to, 0, array.splice(from, 1)[0]), [])
}

function removeFromArray(array, index) {
  return array.filter((item, i) => {
    return i !== Number(index)
  })
}

function insertIntoArray(array, item, target) {
  return [...array.slice(0, target), item, ...array.slice(target)]
}

function updateObjectInArray(array, item) {
  return array.map((current, index) => {
    if (item.id !== current.id) {
      return current
    }
    return {
      ...current,
      ...item
    }
  })
}

function getArrayById(id, array) {
  let match
  array.forEach((item, index) => {
    if (id === item.id) {
      console.log("match")
      match = index
    }
  })
  return match
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      targetIndex: null,
      targetParent: null,
      lists: [
        {
          id: "abcdef",
          data: [
            {
              id: 1,
              text: "First Item"
            },
            {
              id: 2,
              text: "Second Item"
            },
            {
              id: 3,
              text: "Third Item"
            },
            {
              id: 4,
              text: "Fourth Item"
            }
          ]
        },
        {
          id: "fedcba",
          data: [
            {
              id: 5,
              text: "List 2 Item 1"
            },
            {
              id: 6,
              text: "List 2 Item 2"
            },
            {
              id: 7,
              text: "List 2 Item 3"
            },
            {
              id: 8,
              text: "List 2 Item 4"
            }
          ]
        }
      ]
    }

    this.updateOrder = this.updateOrder.bind(this)
    this.updateIndex = this.updateIndex.bind(this)
  }
  updateIndex(index) {
    this.setState({
      targetIndex: index
    })
  }

  updateOrder({ from, parent }) {
    const currentIndex = getArrayById(parent, this.state.lists)
    // const targetIndex = getListById(this.state.targetParent)
    let lists = this.state.lists
    console.log("Parent", parent)
    console.log("Target Parent", this.state.targetParent)
    if (this.state.targetParent === parent) {
      const newList = {
        id: this.state.targetParent,
        data: moveInArray(
          from,
          this.state.targetIndex,
          lists[currentIndex].data
        )
      }
      this.setState({
        lists: updateObjectInArray(lists, newList)
      })
    } else {
      const targetIndex = getArrayById(
        this.state.targetParent,
        this.state.lists
      )
      const newList = {
        id: this.state.targetParent,
        data: insertIntoArray(
          lists[targetIndex].data,
          lists[currentIndex].data[from],
          this.state.targetIndex
        )
      }
      const oldList = {
        id: parent,
        data: removeFromArray(lists[currentIndex].data, from)
      }
      console.log(from)
      console.log(oldList)
      // Add Item to New array

      this.setState(prevState => {
        return {
          lists: updateObjectInArray(prevState.lists, newList)
        }
      })

      this.setState(prevState => {
        return { lists: updateObjectInArray(prevState.lists, oldList) }
      })
      // Remove item from old array
    }
  }

  handleOver(e) {
    console.log(e.currentTarget.dataset.id)
    this.setState({
      targetParent: e.currentTarget.dataset.id
    })
  }

  render() {
    const { lists, targetIndex } = this.state
    return (
      <div className="App">
        {lists.map((list, idx) =>
          <div
            style={sx}
            key={list.id}
            data-id={list.id}
            onDragOver={e => this.handleOver(e)}
          >
            {list.data.map((item, index) => {
              return (
                <DragItem
                  key={item.id}
                  index={index}
                  updateOrder={this.updateOrder}
                  updateIndex={this.updateIndex}
                  targetIndex={targetIndex}
                  parent={list.id}
                >
                  {item.text}
                </DragItem>
              )
            })}
          </div>
        )}
      </div>
    )
  }
}

let sx = {
  width: "40%",
  margin: "1rem",
  display: "inline-block"
}

export default App
