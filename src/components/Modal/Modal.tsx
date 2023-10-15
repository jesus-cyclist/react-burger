import React, { useEffect, FC, ReactNode, SyntheticEvent } from 'react'
import style from './Modal.module.css'
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import { createPortal } from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const reactModal = document.querySelector('#react-modals')

type TModal = {
  closeModal: () => void
  children: ReactNode
}

const Modal = (props: TModal): JSX.Element => {
  const { children, closeModal } = props

  useEffect(() => {
    function escapeHandler(event: KeyboardEvent) {
      event.key === 'Escape' && closeModal()
    }

    document.addEventListener('keyup', escapeHandler)
    return () => {
      document.removeEventListener('keyup', escapeHandler)
    }
  }, [])

  return createPortal(
    <div className={style.wrapper}>
      <div className={style.modal}>
        <button className={style.modalCloseButton}>
          <CloseIcon type={'primary'} onClick={closeModal} />
        </button>
        {children}
      </div>
      <ModalOverlay closeModal={closeModal} />
    </div>,
    reactModal!
  )
}

export default Modal
