import React, { useEffect, useState } from 'react'
import './styles/App.css'
import './styles/reset.css'
import AppHeader from './components/AppHeader/AppHeader'
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients'
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor'
import { request } from './utils/request'
import Modal from './components/Modal/Modal'
import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
} from './services/actions/ingredientsMenu'
import { useAppDispatch } from './hooks/hooks'
import { useAppSelector } from './hooks/hooks'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

//в burgerconstuctorlist лютая ахинея буду признателен если скажете как упростить
//почему у меня в конструкторе справа от цены значок рандомных размеров, это ведь готовый элемент я ему стили не задаю
//при открывании модального окна у меня ошибку выдает, как ее обработать или избавиться

function App() {
  const { downloadedSuccess } = useAppSelector(
    (state) => state.rootReducer.ingredientsMenu
  )
  const { isModalActive, modalContent } = useAppSelector(
    (state) => state.rootReducer.modal
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    const requestObj = {
      routing: 'ingredients',
      action: {
        request: GET_ITEMS_REQUEST,
        success: GET_ITEMS_SUCCESS,
        failed: GET_ITEMS_FAILED,
      },
    }

    dispatch(request(requestObj))
  }, [])

  return (
    <div className="App">
      <AppHeader />
      <div className="wrapper">
        <main className="main">
          {downloadedSuccess && (
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          )}
          {isModalActive && modalContent && <Modal>{modalContent}</Modal>}
        </main>
      </div>
    </div>
  )
}

export default App
