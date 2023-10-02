import React from 'react'
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor'
import { useAppSelector } from '../../hooks/hooks'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styles from './Home.module.css'

function HomePage() {
  const data = useAppSelector((state) => state.rootReducer.ingredients.data)

  return (
    <div className={styles.wrapper}>
      {data && (
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      )}
    </div>
  )
}

export default HomePage
