import React from 'react'
import style from './BurgerConstructor.module.css'
import BurgerConstructorList from '../BurgerConstructorList/BurgerConstructorList'

const BurgerConstructor = () => {
  return (
    <div className={style.column}>
      <BurgerConstructorList />
    </div>
  )
}

export default BurgerConstructor
