import { useMemo } from 'react'
import { useAppSelector } from '../../hooks/hooks'
import { selectIngredients } from '../../services/selectors/ingredientsSelectors'
import { TIngredient } from '../../utils/types'
import BurgerIngredientsItem from '../BurgerIngredientsItem/BurgerIngredientsItem'
import styles from './BurgerIngredientsSection.module.css'

type TBurgerIngredientsSection = {
  title: string
}

const BurgerIngredientsSection = (
  props: TBurgerIngredientsSection
): JSX.Element => {
  const ingredients = useAppSelector(selectIngredients)

  const { title } = props

  const list: Record<string, string> = {
    Булки: 'bun',
    Соусы: 'sauce',
    Начинки: 'main',
  }
  const sortedData = useMemo(
    () =>
      ingredients &&
      ingredients.filter((item: TIngredient) => item.type === list[title]),
    [ingredients, title]
  )

  return (
    <li className={styles.section} id={list[title]}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.list}>
        {sortedData &&
          sortedData.map((item: TIngredient) => (
            <BurgerIngredientsItem key={item._id} item={item} />
          ))}
      </div>
    </li>
  )
}

export default BurgerIngredientsSection
