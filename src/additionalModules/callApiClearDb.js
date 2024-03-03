import React, { useState } from 'react'
import ModalLoader from '../components/UI/ModalLoader/ModalLoader'
import ErrNotification from '../components/UI/ErrNotification/ErrNotification'

const callApiClearDb = (call, ...props) => {

    // состояние для модалки
    const [modal, setModal] = useState(false)
    // cостояние для уведомления с ошибкой
    const [note, setNote] = useState(false)

    const postForm = async () => {
        // предотвратить обновление страницы при нажатии на кнопку
        // a.preventDefault()      
        setModal(true)
        try {
            const resp = await axios.delete(backend_url+'/clearPubmedArticles');
            console.log("Метод delete. Статус = "+resp.status);
            setModal(false);
        } catch(err) {
            console.log(err)
            setModal(false)
            setNote(true)
            setTimeout(() => {
                setNote(false)
            }, 5000);
        }    
    }

    if (call) {
        postForm()
    }

  return (
    <div>
        <ModalLoader visible={modal} setVisible={setModal}/>
        <ErrNotification visible={note} setVisible={setNote}/>
    </div>
  )
}

export default callApiClearDb