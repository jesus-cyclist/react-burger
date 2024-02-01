import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import style from './Modal.module.css'

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
        <button className={style.modalCloseButton} title={'close'}>
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
