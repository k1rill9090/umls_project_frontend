import React, { useState } from 'react'
import styles from './Statistics.module.css'
import MyButton from '../MyButton/MyButton'
import BackButton from '../BackButton/BackButton'
import ModalLoader from '../ModalLoader/ModalLoader'
import Loader from '../Loader/Loader'
import axios from 'axios'

const Statistics = ({getNumPage}) => {
  // состояние для модалки
  const [modal, setModal] = useState(false)

  const getStatistics = (event) => {
    event.preventDefault()
    
    setModal(true)
    setTimeout( async () => {
      await axios.get('http://jsonplaceholder.typicode.com/posts')
      // console.log(resp.data)
      setModal(false)
      getNumPage(3) // отправить значение к родителю (в app.js) для переключения формы на другой компонент
    }, 2000);
  }

    return (
    <div>
      <ModalLoader visible={modal} setVisible={setModal}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Loader/>
        </div>
      </ModalLoader>

      <div className={styles.back}>
        <BackButton/>
      </div>
        
      <div className={styles.main_block}>
        <div>
          <h1 className={styles.h}>Выделение терминов</h1>
          <MyButton onClick={getStatistics}>Получить статистику</MyButton>
        </div>
      </div>      
    </div>
  )
}

export default Statistics
