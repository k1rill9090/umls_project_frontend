import React from 'react'

const Title = (props) => {
  return (
    <div className={props.className}>
            <span style={props.style}>{props.title}</span>
    </div>
  )
}

export default Title