import React, { useContext, useEffect } from 'react'
import style from './Modal.module.css'
import PropTypes from 'prop-types'
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import { createPortal } from 'react-dom'
import { ModalDataContext } from '../../context/appContext'

const reactModal = document.querySelector('#react-modals')

const Modal = (props) => {
  const { children } = props
  const { closeModal } = useContext(ModalDataContext)

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
  children: PropTypes.element.isRequired,
}

export default Modal
