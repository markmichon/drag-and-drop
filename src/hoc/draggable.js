import React, { Component } from "react"

const draggable = WrappedComponent =>
  class DraggableItem extends Component {
    constructor(props) {
      super(props)
      this.state = {
        from: null,
        isDragging: false,
        originalParent: null,
        destinationParent: null,
        prevTo: null,
        parent: null
      }
    }

    end(e) {
      this.props.updateOrder({
        from: this.state.from,
        parent: this.state.parent
      })
    }

    start(e) {
      this.setState({
        from: e.currentTarget.dataset.id,
        parent: this.props.parent
      })
      e.dataTransfer.effectAllowed = "move"

      // Firefox fix
      e.dataTransfer.setData("text/html", null)
    }

    over(e) {
      e.preventDefault()
      const over = e.currentTarget
      const to = Number(over.dataset.id)

      this.props.updateIndex(to)
    }

    render() {
      return (
        <WrappedComponent
          draggable={true}
          onDragOver={e => this.over(e)}
          onDragStart={e => this.start(e)}
          onDragEnd={e => this.end(e)}
          children={this.props.children}
          data-id={this.props.index}
          {...this.props.childProps || {}}
        />
      )
    }
  }

export default draggable
