import React, { FC } from 'react'
import style from './BurgerConstructor.module.css'
import BurgerConstructorList from '../BurgerConstructorList/BurgerConstructorList'
import { useDrop } from 'react-dnd'
import { useAppDispatch } from '../../hooks/hooks'
import { addBuh, addFilling } from '../../services/actions/constructorList'
import { TIngredient } from '../../utils/types'

const BurgerConstructor = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item: TIngredient) {
      dropItem(item)
    },
  })

  function dropItem(ingredient: TIngredient) {
    ingredient.type === 'bun'
      ? dispatch(addBuh(ingredient))
      : dispatch(addFilling(ingredient))
  }

  return (
    <div className={style.column} ref={dropTarget}>
      <BurgerConstructorList />
    </div>
  )
}

export default BurgerConstructor
