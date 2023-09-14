import React, { useRef } from 'react'
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerConstructorItem.module.css'
import PropTypes from 'prop-types'
import { DELETE_FILLING } from '../../services/actions/constructorList'
import { useAppDispatch } from '../../hooks/hooks'
import { useDrag, useDrop } from 'react-dnd'

const BurgerConstructorItem = (props) => {
  const {
    id,
    text,
    price,
    thumbnail,
    isLocked,
    last,
    dragIcon,
    item,
    position,
    moveCard,
    index,
  } = props
  const dispatch = useAppDispatch()
  const refBun = useRef()
  const refFilling = useRef()

  const [{ handlerId }, dropTarget] = useDrop({
    accept: 'filling',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!refFilling.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = refFilling.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()

      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveCard(dragIndex, hoverIndex)

      item.index = hoverIndex
    },
  })

  const [{ isDragging }, dragRef] = useDrag({
    type: 'filling',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1

  function handleClose() {
    dispatch({
      type: DELETE_FILLING,
      id,
    })
  }
  dragRef(dropTarget(refFilling))
  return (
    <div
      className={last ? style.item : style.item + ' ' + style.itemLast}
      ref={item.type !== 'bun' ? refFilling : refBun}
      style={{ opacity }}
    >
      <div
        className={
          dragIcon === true
            ? style.dragIcon
            : style.dragIconHidden + ' ' + style.dragIcon
        }
      >
        <DragIcon />
      </div>
      <ConstructorElement
        text={text}
        price={price}
        thumbnail={thumbnail}
        isLocked={isLocked}
        type={position}
        handleClose={handleClose}
      />
    </div>
  )
}

BurgerConstructorItem.defaultProps = {
  dragIcon: true,
  last: false,
  type: 'bun',
  isLocked: true,
  id: '',
}

BurgerConstructorItem.propTypes = {
  id: PropTypes.string.isRequired,
  dragIcon: PropTypes.bool.isRequired,
  last: PropTypes.bool.isRequired,
  isLocked: PropTypes.bool.isRequired,
  price: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default BurgerConstructorItem
