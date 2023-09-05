import React, { useEffect, useState } from 'react'
import './styles/reset.css'
import './styles/App.css'
import AppHeader from './components/AppHeader/AppHeader'
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients'
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor'
import { request } from './utils/request'
import Modal from './components/Modal/Modal'

function App() {
  const [ingredientsApiData, setIngredientsApiData] = useState(null)
  const [isModalActive, setIsModalActive] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    request(setIngredientsApiData, setError)
  }, [])

  const openModal = (content: any) => {
    setIsModalActive(true)
    setModalContent(content)
  }

  const closeModal = () => {
    setIsModalActive(false)
    setModalContent(null)
  }

  return (
    <div className="App">
      <AppHeader />
      <div className="wrapper">
        <main className="main">
          <BurgerIngredients
            ingredientsApiData={ingredientsApiData}
            openModal={openModal}
            closeModal={closeModal}
          />
          <BurgerConstructor
            ingredientsApiData={ingredientsApiData}
            openModal={openModal}
            closeModal={closeModal}
          />
          <Modal closeModal={closeModal} isModalActive={isModalActive}>
            {modalContent}
          </Modal>
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
