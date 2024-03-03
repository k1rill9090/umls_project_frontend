import React, { useState } from 'react'
import parse from 'html-react-parser'
import {Chart} from 'react-google-charts'
import NewButton from '../../components/main_page/NewButton';
import style from './ListOfTerms.module.css';
import axios from 'axios';
import { backend_url } from '../..';
import Loader from '../../components/UI/Loader/Loader';
import ModalLoader from '../../components/UI/ModalLoader/ModalLoader';
import ErrNotification from '../../components/UI/ErrNotification/ErrNotification';
import AccessNotification from '../../components/UI/AccessNotification/AccessNotification';




const ListOfTerms = () => {

  const [data, setData] = useState(
    [
      ["", "", "", ""],
      [0, 0, 0, 0]
    ]
  )
  
  const options = {
    
    chart: {
      vAxis: { title: "Weight"},
      title: "Статистика встречаемости терминов",
      subtitle: "Топ 10 наболее часто встречающихся терминов по годам"
    }
  };

  
// состояние для лоадера, если true, то появляется элемент компонент данных, если false, то исчезает
  const [isStatLoading, setStatLoading] = useState(false)
  const [note, setNote] = useState(false) // cостояние для уведомления с ошибкой
  const [noteAccess, setNoteAccess] = useState(false) // cостояние для уведомления об успехе

  // состояние для query параметров GET запроса /statistics
  const [limit, setLimit] = useState(9)

  const [err, setErr] = useState([style.selectYearUsual])
  async function calcStat() {
    // функция для вызова методов по выделению терминов и расчете статистики

    setStatLoading(true) //запустить компонент загрузки данных
    try {
      // вызвать метод POST /terms
      await axios.post(backend_url+'/terms', {
        headers: {
          'ngrok-skip-browser-warning': true
        },
      }
      );
      await axios.post(backend_url+'/statistics', {
        headers: {
          'ngrok-skip-browser-warning': true
        },
      }
      );
      // setStatLoading(false) //убрать компонент загрузки данных
      setTimeout(() => {setStatLoading(false)}, 2000);
      setTimeout(() => {setNoteAccess(true)}, 2000);
      setTimeout(() => {setNoteAccess(false)}, 5000);
      console.log("OK")
    }
    catch {
      setStatLoading(false);
      // ниже вызов уведомления об ошибке
      setNote(true);
      setTimeout(() => {
        setNote(false)
      }, 5000);
    }
  }

  async function getStat(limit, year) {
    //функция для вызова метода по получению статистики

    setStatLoading(true) //запустить компонент загрузки данных
    try {
      // вызвать метод GET /statistics
      const responseGetStat = await axios.get(backend_url+'/statistics', {
        headers: {
          'ngrok-skip-browser-warning': true
        },
        params: {
          limit: limit,
          year: year
        }
      }
      );

      // распарсить данные, преобразовать в формат для вывода на график (перевести в список массивов)
      let data_chart = [ 
        [],
        []
      ]

      if (responseGetStat.data.data.length !== 0) {
        data_chart[0].push("Год")
        data_chart[1].push(responseGetStat.data.data[0]['year'])
        for (let i = 0; i < responseGetStat.data.data.length; i++) {
          if (i < 10) {
            data_chart[0].push(responseGetStat.data.data[i]['termName'])
            data_chart[1].push(responseGetStat.data.data[i]['numOfAppearance'])
          }
          
        }

        setData(data_chart)
        // console.log(data)
    }
      else setData([
        ["Нет даных", ""]
      ])

      setStatLoading(false) //убрать компонент загрузки данных
      // console.log(responseGetStat.data.data)
      return responseGetStat.data.data;
    }
    catch {
      setStatLoading(false);

      // ниже вызов уведомления об ошибке
      setNote(true);
      setTimeout(() => {
        setNote(false)
      }, 5000);
    }

    
  }

  function showStat() {
    if (document.getElementById('city-select').value !== "") {
    setErr([style.selectYearUsual])
    getStat(limit, document.getElementById('city-select').value)
    }
    else {
      setErr([style.selectYearUsual, style.selectYearErr])
    }
    
    
  }

//  список годов для селекта
  const dateList = []
  for (let i = 1900; i < 2100; i++) {
    dateList.push(i);
  }

  return (
    <div>
      <div className={style.elems}>
        {/* <Myinput style={{ marginTop: "15px"}} placeholder={"Введите название термина"} type={'text'}/> */}
        
        {/* компонент для выбора года */}
        <select className={err.join(' ')} name="city" id="city-select">
          <option value="">-- Выберите год --</option>
          {dateList.map(p =>
          <option key={p}>{p}</option>
          )}
        </select>

        <NewButton
          class_new={'listTerms'}
          onClick={showStat}>
          Отобразить данные
          </NewButton>

        <NewButton class_new={'listTerms'} onClick={calcStat}>Рассчитать статистику</NewButton>
      </div>
      <div>
        <Chart
              chartType="Bar"
              width="800px"
              height="400px"
              data={data}
              options={options}
        />
        {
          isStatLoading
          ?
          <ModalLoader visible={setStatLoading} setVisible={setStatLoading}>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Loader msgText={parse("Подождите, идет выделение терминов <br /> и расчет статистики")}/>
          </div>
          </ModalLoader>
          :
          <div></div>

        }
        
      </div>
      <ErrNotification visible={note} setVisible={setNote} msgText='Не удалось загрузить данные'/>
      <AccessNotification  visible={noteAccess} setVisible={setNoteAccess} msgText='Статистика по терминам рассчитана!'/>
    </div>
  )
}

export default ListOfTerms