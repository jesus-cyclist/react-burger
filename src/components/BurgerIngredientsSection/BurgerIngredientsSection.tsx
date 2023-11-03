import { useMemo } from 'react'
import { useAppSelector } from '../../hooks/hooks'
import { selectIngredients } from '../../services/selectors/ingredientsSelectors'
import { TIngredient } from '../../utils/types'
import BurgerIngredientsItem from '../BurgerIngredientsItem/BurgerIngredientsItem'
import style from './BurgerIngredientsSection.module.css'

type TBurgerIngredientsSection = {
  title: string
}

const BurgerIngredientsSection = (
  props: TBurgerIngredientsSection
): JSX.Element => {
  const ingredients = useAppSelector(selectIngredients)

  const { title } = props

  const list: Record<string, string> = {
    Булки: 'bun',
    Соусы: 'sauce',
    Начинки: 'main',
  }
  const sortedData = useMemo(
    () =>
      ingredients &&
      ingredients.filter((item: TIngredient) => item.type === list[title]),
    [ingredients, title]
  )

  return (
    <li className={style.section} id={list[title]}>
      <h2 className={style.title}>{title}</h2>
      <div className={style.list}>
        {
          sortedData &&
            // <TransitionGroup className="todo-list">
            sortedData.map((item: TIngredient) => (
              // <CSSTransition
              //   key={id}
              //   nodeRef={createRef()}
              //   timeout={500}
              //   classNames="item"
              // >
              <BurgerIngredientsItem key={item._id} item={item} />
              // </CSSTransition>
            ))
          // </TransitionGroup>
        }
      </div>
    </li>
  )
}

export default BurgerIngredientsSection
