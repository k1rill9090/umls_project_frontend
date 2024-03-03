import React from 'react'
import classes from './Mylabel.module.css'

const Mylabel = ({children, ...props}) => {
  return (
    <label {...props} className={[classes.errLabel, classes.errVisible].join(' ')}>
        {children}
    </label>
  )
}

export default Mylabel
