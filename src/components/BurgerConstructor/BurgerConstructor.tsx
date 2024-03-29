import { useDrop } from 'react-dnd'
import { useAppDispatch } from '../../hooks/hooks'
import { addBuh, addFilling } from '../../services/actions/constructorList'
import { TIngredient } from '../../utils/types'
import BurgerConstructorList from '../BurgerConstructorList/BurgerConstructorList'
import style from './BurgerConstructor.module.css'

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
