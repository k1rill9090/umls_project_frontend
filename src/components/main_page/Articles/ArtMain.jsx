import React, { useEffect, useState } from 'react'
import styles from './ArtMain.module.css'
import Title from './Title'
import axios from 'axios';
import Article from './Article';
import { getFirstLastPages, getPageCount, getPagesArray } from '../../../additionalModules/pagination';
import { backend_url } from '../../../index.js';
import Loader from '../../UI/Loader/Loader.jsx';
import ErrNotification from '../../UI/ErrNotification/ErrNotification.jsx';
// import NewButton from '../NewButton';







const ArtMain = () => {

  const [title, setTitle] = useState([])
  const [article, setArticle] = useState([])
  const [totalArt, setTotalArt] = useState(0)
  const [limit, setLimit] = useState(1)
  const [offset, setOffset] = useState(0)
  const [isPostsLoading, setPostsLoading] = useState(false)
  const [note, setNote] = useState(false) // cостояние для уведомления с ошибкой

// хук useEffect позволяет выполнять различные действия во время работы компонента
// В данном случае он вызывает api для получения списка статей при начале работы компонента (т.е. при загрузке страницы)
  useEffect( () => {
    // console.log('USE EFFECT')
    getArticles(limit, offset)
  }, []) //пустой массив нужен чтобы вызов функции происходил только один раз, при запуске страницы, иначе функция будет выполняться бесконечно


  async function getArticles(limit, offset = 0) {
    setPostsLoading(true);
    try {
      const response = await axios.get(backend_url+'/articles', {
        headers: {
          'ngrok-skip-browser-warning': true
        },
        params: {
          limit: limit,
          offset: offset
        }
      }
      );
      // console.log("Статус: "+response)
      setPostsLoading(false);
      
      setTitle(response.data.data[0])
      setArticle(response.data.data[0])
      setTotalArt(response.data.meta.total_count)
    }
    catch (error) {
      // console.log('Ошибка: ', error.message);
      setPostsLoading(false);
      setNote(true);
      setTimeout(() => {
        setNote(false)
      }, 5000);
      setTotalArt(0)
    }
  }

  let pagesCount = getPageCount(totalArt, limit)
  let firstLastPages = getFirstLastPages(pagesCount) //массив, где первый элемент - первая страница из апи, второй - последняя страница

  let pagesArray = []
  getPagesArray(pagesArray, pagesCount, offset)
  // console.log(pagesArray)

  const changePage = (page) => {
    getArticles(limit, page);
    setOffset(page)
  }



  return (
    <div className={styles.main} style={{marginBottom: '5%'}}>
        <div className={styles.pos}>
            <span className={styles.elems} style={{fontSize: '20px', marginTop: '1.5%', marginBottom: '1.5%'}}>Список статей</span>
        </div>
        <hr style={{borderTop: '1px solid #003F63'}}/>
        <ErrNotification visible={note} setVisible={setNote} msgText='Не удалось загрузить данные'/>      
        
        {isPostsLoading //добавить анимацию загрузки во время загрузки постов через апи
        
        ? <Loader /> 
        
                
        : <div>
            {totalArt === 0 //проверка на наличие записей, если их нет, выводить соответствующий текст
            ? 
            
            <div className={styles.no_data}>
              <span>Нет данных</span>
            </div>
            :
            <div>
            
              <Title title={title.title} className={styles.pos} style={{paddingTop: '3%', paddingLeft: '30%', paddingRight: '30%'}}/>
              <br /><br />  
              <Article article={article.article} className={styles.pos} style={{paddingTop: '3%', paddingLeft: '30%', paddingRight: '30%'}}/>

              <div className={styles.page__wrapper}>

                {/* если страниц больше 5, то отображать в пагинации кнопку в начало, иначе нет */}
                {pagesArray.length > 5 
                
                  ?
                  <span className={styles.page} 
                        onClick={() => changePage(firstLastPages[0] - 1)} //p-1 из-за того, что offset начинается с нуля, а нумерация страниц с 1
                    >
                    {'В начало'}
                  </span>
                  :
                  <div />
                }
                

                {pagesArray[0] !== firstLastPages[0]
                ? 
                <span style={{padding: '10px'}}>{'...'}</span>
                :
                <span></span>
                }
                

                {pagesArray.map(p =>
                <span className={offset + 1 === p ? styles.page__current : styles.page}
                  onClick={() => changePage(p-1)} //p-1 из-за того, что offset начинается с нуля, а нумерация страниц с 1
                  key={p}>{p}
                </span>
                )}

                {pagesArray[pagesArray.length - 1] !== firstLastPages[1]
                ? 
                <span style={{padding: '10px'}}>{'...'}</span>
                :
                <span></span>
                }
                
                {/* если страниц больше 5, то отображать в пагинации кнопку в конец, иначе нет */}
                {pagesArray.length > 5 
                
                ?
                <span className={styles.page}
                    onClick={() => changePage(firstLastPages[1] - 1)} //p-1 из-за того, что offset начинается с нуля, а нумерация страниц с 1
                >
                {'В конец'}
                </span>
                :
                <div />
                }
      
              </div>
            </div>
            }
          </div>
        }

    </div>
  )
}

export default ArtMain