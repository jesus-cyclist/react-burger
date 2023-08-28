import React from 'react'
import styles from './BurgerIngredientsNav.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerIngredientsNav = () => {
  const [current, setCurrent] = React.useState('Булки')
  return (
    <div className={styles.menu}>
      <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
}

export default BurgerIngredientsNav
