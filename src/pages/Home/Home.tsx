import React from 'react'
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor'
import { useAppSelector } from '../../hooks/hooks'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styles from './Home.module.css'
import { useSelector } from 'react-redux'
import { selectIngredients } from '../../services/selectors/ingredientsSelectors'

const HomePage = (): JSX.Element => {
  const data = useSelector(selectIngredients)

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
