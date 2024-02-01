import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Identifier } from 'dnd-core'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useAppDispatch } from '../../hooks/hooks'
import { deleteFilling } from '../../services/actions/constructorList'
import { TIngredient } from '../../utils/types'
import style from './BurgerConstructorItem.module.css'

type TBurgerConstructorItem = {
  id: string
  text: string
  isLocked: boolean
  last: boolean
  dragIcon: boolean
  item: TIngredient
  position: 'bottom' | 'top' | undefined
  moveCard: (x: number, y: number) => void
  index: number
  type: string
}

type TDragObject = {
  id: string
  index: number
  type: string
}

type TDragCollectedProps = {
  isDragging: boolean
}

type TDropCollectedProps = {
  handlerId: Identifier | null
}

const BurgerConstructorItem = (props: TBurgerConstructorItem): JSX.Element => {
  const {
    id,
    text,
    isLocked,
    last,
    dragIcon,
    item,
    position,
    moveCard,
    index,
    type,
  } = props

  const dispatch = useAppDispatch()
  const refBun = useRef<HTMLDivElement | null>(null)
  const refFilling = useRef<HTMLDivElement | null>(null)

  const [{ handlerId }, dropTarget] = useDrop<
    TDragObject,
    undefined,
    TDropCollectedProps
  >({
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

      const hoverClientY = clientOffset!.y - hoverBoundingRect.top
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

  const [{ isDragging }, dragRef] = useDrag<
    TDragObject,
    unknown,
    TDragCollectedProps
  >({
    type: 'filling',

    item: () => {
      return { id, index, type }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1

  function handleClose() {
    dispatch(deleteFilling(id))
  }
  dragRef(dropTarget(refFilling))

  function getClassName(dragIcon: boolean) {
    if (dragIcon === true) {
      return style.dragIcon
    } else {
      return style.dragIconHidden + ' ' + style.dragIcon
    }
  }

  return (
    <div
      className={last ? style.item : style.item + ' ' + style.itemLast}
      ref={item.type !== 'bun' ? refFilling : refBun}
      style={{ opacity }}
      data-test-id={'constructor-ingredients'}
    >
      <div className={getClassName(dragIcon)}>
        <DragIcon type='primary' />
      </div>

      <ConstructorElement
        text={text}
        price={item.price}
        thumbnail={item.image}
        isLocked={isLocked}
        type={position}
        handleClose={handleClose}
      />
    </div>
  )
}

export default BurgerConstructorItem
