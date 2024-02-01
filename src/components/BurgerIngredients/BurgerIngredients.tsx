import BurgerIngredientsList from '../BurgerIngredientsList/BurgerIngredientsList'
import BurgerIngredientsNav from '../BurgerIngredientsNav/BurgerIngredientsNav'
import style from './BurgerIngredients.module.css'

const BurgerIngredients = (): JSX.Element => {
  return (
    <div className={style.column}>
      <h2 className={style.title}>Соберите бургер</h2>
      <nav className={style.nav}>
        <BurgerIngredientsNav />
        <BurgerIngredientsList />
      </nav>
    </div>
  )
}

export default BurgerIngredients
