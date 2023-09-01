import React, { useEffect, useState } from 'react'
import './styles/reset.css'
import './styles/App.css'
import AppHeader from './components/AppHeader/AppHeader'
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients'
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor'
import ModalOverlay from './components/ModalOverlay/ModalOverlay'

function App() {
  const [modalData, setModalData] = useState('')

  useEffect(() => {
    document.addEventListener('keyup', (e) => {
      e.key === 'Escape' && setModalData('')
    })
    return () => {
      document.removeEventListener('keyup', (e) => {
        e.key === 'Escape' && setModalData('')
      })
    }
  }) //А почему keypress не отрабатывает на esc?

  return (
    <div className="App">
      <AppHeader />
      <div className="wrapper">
        <main className="main">
          <BurgerIngredients setModalData={setModalData} />
          <BurgerConstructor setModalData={setModalData} />
          {modalData && (
            <ModalOverlay modalData={modalData} setModalData={setModalData} />
          )}
        </main>
      </div>
      {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
    </div>
  )
}

export default App
