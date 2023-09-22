import React from 'react'
import style from './BurgerConstructor.module.css'
import BurgerConstructorList from '../BurgerConstructorList/BurgerConstructorList'
import { useDrop } from 'react-dnd'
import { useAppDispatch } from '../../hooks/hooks'
import { ADD_BUH, ADD_FILLING } from '../../services/actions/constructorList'

const BurgerConstructor = () => {
  const dispatch = useAppDispatch()
  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      dropItem(item)
    },
  })

  function dropItem(ingredient) {
    ingredient.type === 'bun'
      ? dispatch({ type: ADD_BUH, item: ingredient })
      : dispatch({ type: ADD_FILLING, item: ingredient })
  }

  return (
    <div className={style.column} ref={dropTarget}>
      <BurgerConstructorList />
    </div>
  )
}

export default BurgerConstructor
