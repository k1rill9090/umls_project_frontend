import React from 'react'
import styles from './BackButton.module.css'

const BackButton = () => {
  return (
    <div>
    <a href=" ">
      <div className={styles["arrow-3"]}>
        <span className={styles["arrow-3-text"]} >Назад к форме регистрации</span>
        <svg className={styles["arrow-3-icon"]} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
          <g fill="none" stroke="#204b70" strokeWidth="1.5" strokeLinejoin="round" strokeMiterlimit="10">
            <circle className={styles["arrow-3-iconcircle"]}  cx="16" cy="16" r="15.12"></circle>
            <path className={styles["arrow-3-icon--arrow"]} d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98"></path>
          </g>
        </svg>
      </div>
    </a>
    
    </div>
    )
}

export default BackButton
