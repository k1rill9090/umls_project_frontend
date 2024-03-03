import React from 'react'
import style from './NewButton.module.css'
import { Link } from 'react-router-dom'

const NewButton = ({children, to, class_new, ...props}) => {
    return (
      <div>
        <Link to={to}>
          <button {...props} className={style.btn + " " + style[class_new]}>
            {children}
          </button>
        </Link>
        </div>
    )
  }

export default NewButton