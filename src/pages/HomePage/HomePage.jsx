import React, { useEffect } from 'react'
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor'
import { request } from '../../utils/request'
import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
} from '../../services/actions/ingredientsMenu'
import { useAppDispatch } from '../../hooks/hooks'
import { useAppSelector } from '../../hooks/hooks'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styles from './HomePage.module.css'

function HomePage() {
  const { downloadedSuccess } = useAppSelector(
    (state) => state.rootReducer.ingredientsMenu
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
    <div className={styles.wrapper}>
      {downloadedSuccess && (
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      )}
    </div>
  )
}

export default HomePage
