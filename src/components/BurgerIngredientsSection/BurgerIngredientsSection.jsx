import React, { useContext, useMemo } from 'react'
import BurgerIngredientsItem from '../BurgerIngredientsItem/BurgerIngredientsItem'
import style from './BurgerIngredientsSection.module.css'
import PropTypes from 'prop-types'
import { IngredientsDataContext } from '../../context/appContext'

const BurgerIngredientsSection = (props) => {
  const { ingredientsApiData } = useContext(IngredientsDataContext)
  const { title } = props

  const list = { Булки: 'bun', Соусы: 'sauce', Начинки: 'main' }
  const sortedData = useMemo(
    () => ingredientsApiData.filter((item) => item.type === list[title]),
    [ingredientsApiData, title]
  ) //реакт просит обернуть list  в юз мемо, но я не очень понял как это сделать

  return (
    <li className={style.section}>
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
