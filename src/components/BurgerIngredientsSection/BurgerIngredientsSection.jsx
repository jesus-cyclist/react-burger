import React, { useMemo } from 'react'
import BurgerIngredientsItem from '../BurgerIngredientsItem/BurgerIngredientsItem'
import style from './BurgerIngredientsSection.module.css'
import PropTypes from 'prop-types'
import { useAppSelector } from '../../hooks/hooks'

const BurgerIngredientsSection = (props) => {
  const ingredients = useAppSelector(
    (state) => state.rootReducer.ingredientsMenu.ingredients.data
  )

  const { title } = props

  const list = { Булки: 'bun', Соусы: 'sauce', Начинки: 'main' }
  const sortedData = useMemo(
    () => ingredients.filter((item) => item.type === list[title]),
    [ingredients, title]
  )

  return (
    <li className={style.section} id={list[title]}>
      <h2 className={style.title}>{title}</h2>
      <div className={style.list}>
        {sortedData.map((item) => (
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
