import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import {
  makeBunActive,
  makeMainActive,
  makeSauceActive,
} from '../../services/actions/activeTab'
import { selectActiveTab } from '../../services/selectors/activeTabSelectors'
import styles from './BurgerIngredientsNav.module.css'

const BurgerIngredientsNav = (): JSX.Element => {
  const activeTab = useAppSelector(selectActiveTab)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const tabs = document.querySelectorAll('.link')

    function clickHandler(event: Event) {
      event.preventDefault()

      if (event.target) {
        const targetId = (event.target as Element)
          .closest('.link')
          ?.getAttribute('href')
          ?.substring(1)

        if (targetId) {
          const targetElement = document.getElementById(targetId)

          targetElement && targetElement.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

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
          onClick={() => dispatch(makeBunActive())}
        >
          Булки
        </Tab>
      </a>

      <a className="link" href="#sauce">
        <Tab
          value="sauce"
          active={activeTab === 'sauce'}
          onClick={() => dispatch(makeMainActive())}
        >
          Соусы
        </Tab>
      </a>

      <a className="link" href="#main">
        <Tab
          value="main"
          active={activeTab === 'main'}
          onClick={() => dispatch(makeSauceActive())}
        >
          Начинки
        </Tab>
      </a>
    </div>
  )
}

export default BurgerIngredientsNav
