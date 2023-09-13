import React, { useEffect } from 'react'
import styles from './BurgerIngredientsNav.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppSelector, useAppDispatch } from '../../hooks/hooks'
import {
  MAKE_BUN_ACTIVE,
  MAKE_MAIN_ACTIVE,
  MAKE_SAUCE_ACTIVE,
} from '../../services/actions/activeTab'

function clickHandler(event) {
  event.preventDefault()

  const targetId = event.target
    .closest('.link')
    .getAttribute('href')
    .substring(1)
  const targetElement = document.getElementById(targetId)

  targetElement && targetElement.scrollIntoView({ behavior: 'smooth' })
}

const BurgerIngredientsNav = () => {
  const activeTab = useAppSelector(
    (state) => state.rootReducer.activeTab.current
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    const tabs = document.querySelectorAll('.link')

    tabs.forEach((link) => {
      link.addEventListener('click', (e) => clickHandler(e))
    })
    return tabs.forEach((link) => {
      link.removeEventListener('click', (e) => clickHandler(e))
    })
  }, [])

  return (
    <div className={styles.menu} id={'tabs'}>
      <a className="link" href="#bun">
        <Tab
          value="bun"
          active={activeTab === 'bun'}
          onClick={() => dispatch({ type: MAKE_BUN_ACTIVE })}
        >
          Булки
        </Tab>
      </a>

      <a className="link" href="#sauce">
        <Tab
          value="sauce"
          active={activeTab === 'sauce'}
          onClick={() => dispatch({ type: MAKE_SAUCE_ACTIVE })}
        >
          Соусы
        </Tab>
      </a>

      <a className="link" href="#main">
        <Tab
          value="main"
          active={activeTab === 'main'}
          onClick={() => dispatch({ type: MAKE_MAIN_ACTIVE })}
        >
          Начинки
        </Tab>
      </a>
    </div>
  )
}

export default BurgerIngredientsNav
