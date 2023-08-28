import data from '../../utils/data'
import React from 'react'
import BurgerIngredientsItem from '../BurgerIngredientsItem/BurgerIngredientsItem'
import style from './BurgerIngredientsSection.module.css'

const BurgerIngredientsSection = ({ title }) => {
  const list = { Булки: 'bun', Соусы: 'sauce', Начинки: 'main' }
  const sortedData = () => {
    return data.filter((item) => item.type === list[title])
  }

  return (
    <div className={style.section}>
      <h2 className={style.title}>{title}</h2>
      <div className={style.list}>
        {sortedData().map((item) => (
          <BurgerIngredientsItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default BurgerIngredientsSection
