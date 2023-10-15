import React, { useMemo } from 'react'
import BurgerIngredientsItem from '../BurgerIngredientsItem/BurgerIngredientsItem'
import style from './BurgerIngredientsSection.module.css'
import PropTypes from 'prop-types'
import { TIngredient } from '../../utils/types'
import { useSelector } from 'react-redux'

type TBurgerIngredientsSection = {
  title: string
}

const BurgerIngredientsSection = (
  props: TBurgerIngredientsSection
): JSX.Element => {
  //@ts-ignore
  const ingredients = useSelector((state) => state.rootReducer.ingredients.data)

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
        {sortedData.map((item: TIngredient) => (
          <BurgerIngredientsItem key={item._id} item={item} />
        ))}
      </div>
    </li>
  )
}

BurgerIngredientsSection.propTypes = {
  title: PropTypes.string.isRequired,
}

export default BurgerIngredientsSection
