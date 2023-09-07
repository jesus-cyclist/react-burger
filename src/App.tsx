import React, { useEffect, useState } from 'react'
import './styles/reset.css'
import './styles/App.css'
import AppHeader from './components/AppHeader/AppHeader'
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients'
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor'
import { ingredientsApiRequest } from './utils/ingredientsApiRequest'
import Modal from './components/Modal/Modal'
import {
  ErrorDataContext,
  IngredientsDataContext,
  ModalDataContext,
} from './context/appContext'

function App() {
  const [ingredientsApiData, setIngredientsApiData] = useState(null)
  const [isModalActive, setIsModalActive] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    ingredientsApiRequest(setIngredientsApiData, setError)
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
          <ErrorDataContext.Provider value={{ setError }}>
            <IngredientsDataContext.Provider value={{ ingredientsApiData }}>
              <ModalDataContext.Provider value={{ closeModal, openModal }}>
                {ingredientsApiData && (
                  <>
                    <BurgerIngredients />
                    <BurgerConstructor />
                  </>
                )}
                {isModalActive && modalContent && <Modal>{modalContent}</Modal>}{' '}
              </ModalDataContext.Provider>
            </IngredientsDataContext.Provider>
          </ErrorDataContext.Provider>
          {/* {ingredientsApiData && (
            <>
              <ErrorDataContext.Provider value={{ setError }}>
                <IngredientsDataContext.Provider value={{ ingredientsApiData }}>
                  <ModalDataContext.Provider value={{ closeModal, openModal }}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                  </ModalDataContext.Provider>
                </IngredientsDataContext.Provider>
              </ErrorDataContext.Provider>
            </>
          )}
          {isModalActive && modalContent && (
            <ModalDataContext.Provider value={{ closeModal, openModal }}>
              <Modal>{modalContent}</Modal>
            </ModalDataContext.Provider>
          )} */}
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
