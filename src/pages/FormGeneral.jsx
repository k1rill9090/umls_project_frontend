import '../styles/App.css';
import React, { useState } from 'react'
import MyForm from '../components/UI/Form/MyForm';
import ArtsLoadingResult from '../components/UI/ArtsLoadingResult/ArtsLoadingResult';


function FormGeneral() {
    // состояние, определяющее по числу, какой компонент рендерить в switch case
    const [page, setPage] = useState(0)

    // получить значение от дочернего компонента для отрисовки конкретного компонента
    // numPage - целое число
    const getPage = (numPage) => {
        setPage(numPage)
    }
    
    return (
        <div>
            {/* <Header/> */}
            {/* функция немедленного вызова. синтаксис: (func)(). в первых скобках содержимое функции, вторые означают выполнить сейчас. */}
            {(() => {
                switch (page) {
                    case 0:
                        return (
                            <MyForm getNumPage={getPage}/>
                        )
                    case 1:
                        return (
                            /* костыль для отображения результата загрузки абстрактов. 
                            Раньше этот компонент вызывал все методы по отдельности(это делает код ниже) */
                            <ArtsLoadingResult />
                        )
                    default:
                        return (
                            <MyForm getNumPage={getPage}/>
                        )
                }
            })()}
            
        </div>
    )
}

export default FormGeneral
