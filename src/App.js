import React from 'react'
import './styles/App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import About from './pages/About/About'
import Articles from './pages/Articles';
import Header from './components/main_page/Header';
// import MyForm from './components/UI/Form/MyForm'
import ListOfTerms from './pages/ListOfTerms/ListOfTerms';
import FormGeneral from './pages/FormGeneral'


function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/about' element={<About/>}/>
        <Route path='/articles' element={<Articles currentUrl={window.location.href}/>}/>
        <Route path='/listTerms' element={<div className={'barChart'}><ListOfTerms /></div>}/>
        <Route path='/form' element={<FormGeneral />}/>
        <Route path="*" element={<Navigate to="/articles" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;