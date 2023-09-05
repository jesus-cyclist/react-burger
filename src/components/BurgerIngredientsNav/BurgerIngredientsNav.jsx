import React from 'react'
import styles from './BurgerIngredientsNav.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerIngredientsNav = () => {
  const [current, setCurrent] = React.useState('buh')
  return (
    <div className={styles.menu}>
      <Tab value="buh" active={current === 'buh'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="main" active={current === 'main'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
}

export default BurgerIngredientsNav
