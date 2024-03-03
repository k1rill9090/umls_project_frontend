import React, { useState } from 'react'
import styles from './HighlightTerms.module.css'
import MyButton from '../MyButton/MyButton'
import BackButton from '../BackButton/BackButton'
import ModalLoader from '../ModalLoader/ModalLoader'
import Loader from '../Loader/Loader'
import axios from 'axios'
import { backend_url } from '../../../index.js';


const HighlightTerms = ({getNumPage, articles}) => {
  // состояние для модалки
  const [modal, setModal] = useState(false)

  const [article, setArticle] = useState(articles)
  const [offset, setOffset] = useState(0)

  const findTerms = async (event) => {
    event.preventDefault()
    setModal(true)
    setTimeout( async () => {
      await axios.get('http://jsonplaceholder.typicode.com/posts')
      setModal(false)
      getNumPage(2) // отправить значение к родителю (в app.js) для переключения формы на другой компонент
    }, 2000);
  }

  const nextPage = async (event) => {
    event.preventDefault()
    const resp = await axios.get(backend_url+"/articles", {
      params: {
        limit: 1,
        offset: offset <= articles.meta.count ? offset+1 : offset
      }
    })
    setArticle(resp.data)
    if (offset < articles.meta.count-2) setOffset(offset+1)
    
  } 

  const prevPage = async (event) => {
    event.preventDefault()
    
    const resp = await axios.get(backend_url+"/articles", {
      params: {
        limit: 1,
        offset: offset > 0 ? offset-1 : offset
      }
    })
    setArticle(resp.data)
    if (offset > 0) setOffset(offset-1)
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
        <div style={{marginTop: "50px"}}>
          <h1 className={styles.h}>Выделение терминов</h1>
          <MyButton onClick={findTerms}>Выделить термины</MyButton>
        </div>
        {/* <div className={styles.text}>
           <h3 style={{fontFamily: 'golos-text'}}>Выгруженные статьи</h3><br/><br/>
            {article.data.map((art) => 
              <div key={art.id}>
              <br/><br/><div><h5>{art.title}</h5></div><br/><br/><br/>
                <div>{art.article}</div>
              </div>
              
            )}
        </div>
        <div style={{marginBottom: '40px'}}>
          <button onClick={prevPage}>Пред</button>
          <button onClick={nextPage}>След</button>
        </div> */}
      </div>      
    </div>
  )
}

export default HighlightTerms
