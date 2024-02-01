import { useAppDispatch } from '../../hooks/hooks'
import { makeScroll } from '../../services/actions/activeTab'
import BurgerIngredientsSection from '../BurgerIngredientsSection/BurgerIngredientsSection'
import style from './BurgerIngredientsList.module.css'

const BurgerIngredientsList = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const title = ['Булки', 'Соусы', 'Начинки']

  function scrollHandler() {
    const bun = document.getElementById('bun')
    const sauce = document.getElementById('sauce')
    const main = document.getElementById('main')
    const tabs = document.getElementById('tabs')

    if (bun && sauce && main && tabs) {
      const bunRect = bun.getBoundingClientRect()
      const sauceRect = sauce.getBoundingClientRect()
      const mainRect = main.getBoundingClientRect()
      const tabsRect = tabs.getBoundingClientRect()

      const bunDistance = bunRect.bottom - tabsRect.bottom
      const sauceDistance = sauceRect.bottom - tabsRect.bottom
      const mainDistance = mainRect.bottom - tabsRect.bottom

      return { bunDistance, sauceDistance, mainDistance }
    }
    return { bunDistance: 0, sauceDistance: 0, mainDistance: 0 }
  }

  return (
    <ul
      className={style.list}
      onScroll={(e) => dispatch(makeScroll(scrollHandler()))}
      data-test-id='burger-ingredients-list'
    >
      {title.map((item) => (
        <BurgerIngredientsSection key={item} title={item} />
      ))}
    </ul>
  )
}

export default BurgerIngredientsList
