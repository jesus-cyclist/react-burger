import React from 'react'
import style from './ModalOverlay.module.css'

type TModalOverlay = {
  closeModal: () => void
}

const ModalOverlay = (props: TModalOverlay): JSX.Element => {
  const { closeModal } = props

  return <div className={style.modalOverlay} onClick={() => closeModal()} />
}

export default ModalOverlay
