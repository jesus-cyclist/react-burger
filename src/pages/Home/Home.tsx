import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients'
import { useAppSelector } from '../../hooks/hooks'
import { selectIngredients } from '../../services/selectors/ingredientsSelectors'
import styles from './Home.module.css'

const HomePage = (): JSX.Element => {
  const data = useAppSelector(selectIngredients)

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
