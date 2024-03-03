import React from 'react'
import styles from './ModalLoader.module.css'

const ModalLoader = ({children, visible, setVisible}) => {
    const rootClasses = [styles.modal]
    if (visible) {
        rootClasses.push(styles.active)
    }
  return (
    <div className={rootClasses.join(' ')}>
        <div className={styles.modalContent}>
            {children}
        </div>
      
    </div>
  )
}

export default ModalLoader
