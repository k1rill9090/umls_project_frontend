import React from 'react'
import cl from './MyInput.module.css'

const Myinput = (props) => {
  return (
      <input {...props} className={cl.text_field__input} type={props.type} placeholder={props.placeholder}/>          
  )
}

export default Myinput
