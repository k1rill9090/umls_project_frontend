import React, { useState } from 'react'
import Logo from './Logo';
import styles from './Header.module.css';
import NewButton from './NewButton';
import ModalLoader from '../UI/ModalLoader/ModalLoader';
import { backend_url } from '../..';
import axios from 'axios';
import ErrNotification from '../UI/ErrNotification/ErrNotification';
import Loader from '../UI/Loader/Loader';
import AccessNotification from '../UI/AccessNotification/AccessNotification';


function Header() {

  const def_pages = {articles: false, listTerms: false, form: false, about: false} 
  const currentPage = window.location.href.split('/') //определить текущий роут для выделения кнопки в хедере

  // логика для выделения активной страницы в хедере (выделение соответствующей кнопки)
    let trueCount = 0
    for (const key in Object.keys(def_pages)) {
      if (Object.keys(def_pages)[key] === currentPage[currentPage.length-1]) {
        def_pages[Object.keys(def_pages)[key]] = true
        trueCount = 1
      }
    }
    if (trueCount === 0) {def_pages['articles'] = true}
  
  
  // console.log(def_pages)
  // состояние для модалки
  const [modal, setModal] = useState(false)
  // cостояние для уведомления с ошибкой
  const [note, setNote] = useState(false)
  // cостояние для уведомления об успехе
  const [noteAccess, setNoteAccess] = useState(false)

  const [active, setActive] = useState(def_pages)

  const handleClick = (e) => {
    
    const dct = {};
    for (const key in active) {
        if (e.target.id === key) {
          dct[key] = true
        }
        else {
          dct[key] = false
        }
      }
    
    setActive(dct);

  }

  // функция по вызову апи удаления постов. Для кнопки удаления.
  // При запуске открывается модалка и при завершении появляется уведомление об успехе или неудаче
  const clearDb = async () => {
      // предотвратить обновление страницы при нажатии на кнопку
      // a.preventDefault()      
      setModal(true)
      try {
          await axios.delete(backend_url+'/clearPubmedArticles', {headers: {'ngrok-skip-browser-warning': true}});
          // console.log("Метод delete. Статус = "+resp.status);
          setTimeout(() => {setModal(false)}, 2000);
          setTimeout(() => {setNoteAccess(true)}, 2000);
          setTimeout(() => {setNoteAccess(false)}, 5000);
          
      } catch(err) {
          console.log(err)
          setModal(false)
          setNote(true)
          setTimeout(() => {
              setNote(false)
          }, 5000);
      }    
  }


  return (
    <div style={{marginLeft: "10%", marginRight: "10%"}}>
      <div className={styles.header}>
        <ModalLoader visible={modal} setVisible={setModal}><Loader msgText='Очистка БД'/></ModalLoader>
        <AccessNotification  visible={noteAccess} setVisible={setNoteAccess} msgText='База данных очищена!'/>
        <ErrNotification visible={note} setVisible={setNote} msgText='Не удалось очистить БД'/>
        <div className={styles.main}>
          <Logo/>

            <div className={active.articles ? styles.totalBtn+' '+ styles.active : styles.totalBtn}>
            <NewButton id='articles' to='/articles' onClick={handleClick}>
              Список статей
            </NewButton>
            </div>

            <div className={active.listTerms ? styles.totalBtn+' '+ styles.active : styles.totalBtn}>
            <NewButton id='listTerms' to='/listTerms' onClick={handleClick}>список терминов</NewButton>
            </div>

            <div className={active.form ? styles.totalBtn+' '+ styles.active : styles.totalBtn}>
            <NewButton id='form' to='/form' onClick={handleClick}>
              Загрузить статьи
            </NewButton>
            </div>

            <button className={styles.clearBtn} onClick={clearDb}>Очистить данные</button>
        </div>

        <div style={{marginRight: '15%'}} className={active.about ? styles.totalBtn+' '+ styles.active : styles.totalBtn}>
          <NewButton id='about' to='/about' onClick={handleClick}>
            О сайте
          </NewButton>
        </div>

      </div>
      <hr style={{borderTop: '1px solid #003F63'}}/>
    </div>
  )
}

export default Header
