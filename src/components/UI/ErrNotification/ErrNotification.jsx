import React from 'react'
import styles from './ErrNotification.module.css'

// если приходит флаг visible=true, то отобразить уведомление(добавить класс active для div)
const ErrNotification = ({visible, setVisible, msgText}) => {
    const vsb = [styles.main]
    if (visible) {
        vsb.push(styles.active)
    }

    const close = () => {
        setVisible(false)
    }

  return (
    <div className={vsb.join(' ')}>
        <div className={[styles.toast, styles.toast_default].join(' ')}>
            <div className={styles["toast__header"]}>Ошибка</div>
            <div className={styles["toast__body"]}>{msgText}</div>
            <button className={styles["toast__close"]} type="button" onClick={close}></button>
        </div>
    </div>
  )
}

export default ErrNotification
