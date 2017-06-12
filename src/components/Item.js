import React from "react"

const sx = {
  backgroundColor: "#efefef",
  color: "#333",
  padding: "1rem",
  margin: "1rem"
}

const Item = props => {
  return <div style={sx} {...props}>{props.children}</div>
}

export default Item
