import React, { useMemo } from 'react'
import BurgerIngredientsItem from '../BurgerIngredientsItem/BurgerIngredientsItem'
import style from './BurgerIngredientsSection.module.css'
import { TIngredient } from '../../utils/types'
import { useSelector } from 'react-redux'
import { selectIngredients } from '../../services/selectors/ingredientsSelectors'

type TBurgerIngredientsSection = {
  title: string
}

const BurgerIngredientsSection = (
  props: TBurgerIngredientsSection
): JSX.Element => {
  const ingredients = useSelector(selectIngredients)

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
    <li className={style.section} id={list[title]}>
      <h2 className={style.title}>{title}</h2>
      <div className={style.list}>
        {sortedData &&
          sortedData.map((item: TIngredient) => (
            <BurgerIngredientsItem key={item._id} item={item} />
          ))}
      </div>
    </li>
  )
}

export default BurgerIngredientsSection
