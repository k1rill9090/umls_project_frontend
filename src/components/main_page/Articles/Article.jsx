import React from 'react'

const Article = (props) => {
  return (
    <div className={props.className} style={{padding: '60px', textAlign: 'justify', lineHeight: "0.7cm"}}>
        <span>{props.article}</span>
    </div>
  )
}

export default Article