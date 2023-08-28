import React from 'react'
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerConstructorItem.module.css'

const BurgerConstructorItem = ({ dragIcon, last, ...props }) => {
  return (
    <div className={last ? style.item : style.item + ' ' + style.itemLast}>
      <div
        className={
          dragIcon === 'true'
            ? style.dragIcon
            : style.dragIconHidden + ' ' + style.dragIcon
        }
      >
        <DragIcon />
      </div>
      <ConstructorElement {...props} />
    </div>
  )
}

export default BurgerConstructorItem
