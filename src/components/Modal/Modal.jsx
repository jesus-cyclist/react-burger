import React, { useEffect } from 'react'
import style from './Modal.module.css'
import PropTypes from 'prop-types'
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import { createPortal } from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const reactModal = document.querySelector('#react-modals')

const Modal = (props) => {
  const { children, closeModal = null } = props

  useEffect(() => {
    function escapeHandler(event) {
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
    reactModal
  )
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([null])])
    .isRequired,
}

export default Modal
