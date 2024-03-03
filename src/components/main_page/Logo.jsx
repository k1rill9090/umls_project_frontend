import React from 'react'
import logo from '../../static/images/Rosnou_logo_new.png'
import styles from './Logo.module.css';

function Logo() {
  return (
    <div>
      <img src={logo} className={styles.image} alt='logo'/>
    </div>
  )
}

export default Logo
