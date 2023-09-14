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
import { ModalDataContext } from './context/appContext'

//в burgerconstuctorlist лютая ахинея буду признателен если скажете как упростить
//почему у меня в конструкторе справа от цены значок рандомных размеров, это ведь готовый элемент я ему стили не задаю
//как мне сделать с модалкой? я ее раньше в состоянии хранил а теперь редукс не дает(

function App() {
  const [modalContent, setModalContent] = useState(null)

  const { downloadedSuccess } = useAppSelector(
    (state) => state.rootReducer.ingredientsMenu
  )
  const { isModalActive } = useAppSelector((state) => state.rootReducer.modal)

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
              <ModalDataContext.Provider value={setModalContent}>
                <BurgerIngredients />
                <BurgerConstructor />
              </ModalDataContext.Provider>
            </DndProvider>
          )}
          {isModalActive && modalContent && <Modal>{modalContent}</Modal>}
        </main>
      </div>
    </div>
  )
}

export default App
