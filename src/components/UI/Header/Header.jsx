import React from 'react'
import logo from "../../../static/images/Rosnou_logo_new.png"
import classes from './Header.module.css'

const Header = () => {
  return (
    <div style={{margin: 0, width: '100%'}}>    

      <div className={classes.head}>
        <h1 className={classes.h}>Выделение новых терминов</h1>
        <hr className={classes.line}/>
        <div className={classes.rosnou_img}>
          <img className={classes.rosnou_logo} alt="rosnou logo" src={logo}/>
        </div>
      </div>

        
      
      
    </div>
  )
}

export default Header
