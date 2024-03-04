import React, { useState } from 'react'
import parse from 'html-react-parser'
// import {Chart} from 'react-google-charts'
import NewButton from '../../components/main_page/NewButton';
import style from './ListOfTerms.module.css';
import axios from 'axios';
import { backend_url } from '../..';
import Loader from '../../components/UI/Loader/Loader';
import ModalLoader from '../../components/UI/ModalLoader/ModalLoader';
import ErrNotification from '../../components/UI/ErrNotification/ErrNotification';
import AccessNotification from '../../components/UI/AccessNotification/AccessNotification';
import { validate_syn_param, validate_syn_qty, validate_syn_year } from '../../additionalModules/validation_syn';
import OrgChartTree from '../../components/chart/OrgChartTree'




const ListOfTerms = () => {
  // состояния для динамической загрузки даты
  const [data, setData] = useState({})
  const [input, setInput] = useState('')
  const [qty, setQty] = useState(null)

  
  // состояние для лоадера, если true, то появляется элемент компонент данных, если false, то исчезает
  const [isStatLoading, setStatLoading] = useState(false)
  const [note, setNote] = useState(false) // cостояние для уведомления с ошибкой
  const [noteAccess, setNoteAccess] = useState(false) // cостояние для уведомления об успехе


  const [errYear, setErrYear] = useState([style.selectUsual])
  const [errName, setErrName] = useState([style.selectUsualName])
  const [errQty, setErrQty] = useState([style.selectUsual])


  async function get_terms(params) {
    // функция для вызова метода по получению синонимов терминов

    setStatLoading(true) //запустить компонент загрузки данных
    try {
      const res = await axios.get(backend_url+'/synonyms', {
        headers: {
          // это не актуально, если не испльзуется ngrok
          'ngrok-skip-browser-warning': true
        },
        params: params
      }
      );

      setData({"name": "TERMS", "children": res.data})
      // console.log(data)
      // setStatLoading(false) //убрать компонент загрузки данных
      setTimeout(() => {setStatLoading(false)}, 1000);
      setTimeout(() => {setNoteAccess(true)}, 1000);
      setTimeout(() => {setNoteAccess(false)}, 1000);
      // console.log("OK")
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

  // validate_syn_year(document.getElementById('city-select').value
  function check_params(){
      if (validate_syn_param(input) && validate_syn_qty(qty)){
        setErrName([style.selectUsual])
        setErrQty([style.selectUsual])
        if (validate_syn_year(document.getElementById('city-select').value)) {
          get_terms({record: input, limit: qty, date_add: document.getElementById('city-select').value})
        }
        else {
          get_terms({record: input, limit: qty})
        }
        
      }
      else {
        if (!validate_syn_param(input)) {setErrName([style.selectUsual, style.err])} else {setErrName([style.selectUsual])}
        if (!validate_syn_qty(qty)) {setErrQty([style.selectUsual, style.err])} else {setErrQty([style.selectUsual])}
      }
  }

  //  список годов для селекта
  const dateList = []
  for (let i = 1900; i < 2100; i++) {
    dateList.push(i);
  }

  return (
    <div>
      <div className={style.elems} >
        <select className={errYear.join(' ')} id='city-select'>
          <option value="">-- Выберите год --</option>
          {dateList.map(p =>
          <option key={p}>{p}</option>
          )}
        </select>

        <input placeholder={'Название термина'} className={errName.join(' ')} onChange={e => setInput(e.target.value)}></input>
        <input placeholder={'Кол-во'} className={errQty.join(' ')} type={'number'} style={{width: "60px"}} onChange={e => setQty(e.target.value)}></input>

        <NewButton class_new={'listTerms'} onClick={check_params}>Выполнить</NewButton>
      </div>
      <div>
      <OrgChartTree orgChart={data} />
        {
          isStatLoading
          ?
          <ModalLoader visible={setStatLoading} setVisible={setStatLoading}>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Loader msgText={parse("Подождите, идет загрузка")}/>
          </div>
          </ModalLoader>
          :
          <div></div>

        }
        
      </div>
      <ErrNotification visible={note} setVisible={setNote} msgText='Не удалось загрузить данные'/>
      <AccessNotification  visible={noteAccess} setVisible={setNoteAccess} msgText='Данные загружены!'/>
    </div>
  )
}

export default ListOfTerms