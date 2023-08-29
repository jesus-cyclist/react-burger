import React from 'react'
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerConstructorItem.module.css'
import PropTypes from 'prop-types'

const BurgerConstructorItem = ({ dragIcon, last, ...props }) => {
  return (
    <div className={last ? style.item : style.item + ' ' + style.itemLast}>
      <div
        className={
          dragIcon === true
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

BurgerConstructorItem.defaultProps = {
  dragIcon: true,
  last: false,
  type: '',
}

BurgerConstructorItem.propTypes = {
  dragIcon: PropTypes.bool.isRequired,
  last: PropTypes.bool.isRequired,
  isLocked: PropTypes.bool.isRequired,
  price: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default BurgerConstructorItem
