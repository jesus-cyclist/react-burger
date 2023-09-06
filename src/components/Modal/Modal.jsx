import React, { useEffect } from 'react'
import style from './Modal.module.css'
import PropTypes from 'prop-types'
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import { createPortal } from 'react-dom'

const reactModal = document.querySelector('#react-modals')

const Modal = (props) => {
  const { closeModal, children } = props

  useEffect(() => {
    document.addEventListener('keyup', (e) => {
      e.key === 'Escape' && closeModal()
    })
    return () => {
      document.removeEventListener('keyup', (e) => {
        e.key === 'Escape' && closeModal()
      })
    }
  }, [])

  return createPortal(
    <div className={style.modal}>
      {children}
      <ModalOverlay closeModal={closeModal} />
    </div>,
    reactModal
  )
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
}

export default Modal
