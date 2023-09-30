import React, { useEffect } from 'react'
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor'
import { useAppDispatch } from '../../hooks/hooks'
import { useAppSelector } from '../../hooks/hooks'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styles from './Home.module.css'

function HomePage() {
  const { downloadedSuccess } = useAppSelector(
    (state) => state.rootReducer.ingredientsMenu
  )

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
