import React from 'react'
import style from './ModalOverlay.module.css'
import { useAppDispatch } from '../../hooks/hooks'
import { CLOSE_MODAL } from '../../services/actions/modal'

const ModalOverlay = () => {
  const dispatch = useAppDispatch()

  return (
    <div
      className={style.modalOverlay}
      onClick={() => dispatch({ type: CLOSE_MODAL })}
    />
  )
}

export default ModalOverlay
