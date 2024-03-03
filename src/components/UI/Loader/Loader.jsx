import React from 'react'
import styles from './Loader.module.css'

const Loader = ({msgText, ...props}) => {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{paddingTop: '50px', paddingBottom: '70px'}}>
          <div>
            <div className={styles.spinner} />
          </div>
          <div style={{textAlign: "center"}}>
            <label style={{fontFamily: 'golos-text', fontSize: '0.9rem'}}>{msgText}</label>
          </div>
        </div>
    </div>
  )
}

export default Loader
