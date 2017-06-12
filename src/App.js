import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"

import Item from "./components/Item"
import draggable from "./hoc/draggable"

const DragItem = draggable(Item)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      targetIndex: null,
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
    }

    this.updateOrder = this.updateOrder.bind(this)
    this.updateIndex = this.updateIndex.bind(this)
  }
  updateIndex(index) {
    this.setState({
      targetIndex: index
    })
  }
  updateOrder({ from }) {
    console.log("From", from)

    const data = this.state.data
    this.setState({
      data: data.concat(
        data.splice(this.state.targetIndex, 0, data.splice(from, 1)[0]),
        []
      )
    })
  }

  render() {
    const { data, targetIndex } = this.state
    return (
      <div className="App">
        {data.map((item, index) => {
          return (
            <DragItem
              key={item.id}
              index={index}
              updateOrder={this.updateOrder}
              updateIndex={this.updateIndex}
              targetIndex={targetIndex}
            >
              {item.text}
            </DragItem>
          )
        })}
      </div>
    )
  }
}

export default App
