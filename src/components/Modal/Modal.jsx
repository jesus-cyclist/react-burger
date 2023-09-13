import React, { useEffect } from 'react'
import style from './Modal.module.css'
import PropTypes from 'prop-types'
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import { createPortal } from 'react-dom'
import { useAppDispatch } from '../../hooks/hooks'
import { CLOSE_MODAL } from '../../services/actions/modal'

const reactModal = document.querySelector('#react-modals')

const Modal = (props) => {
  const { children } = props
  const dispatch = useAppDispatch()

  useEffect(() => {
    document.addEventListener('keyup', (e) => {
      e.key === 'Escape' && dispatch({ type: CLOSE_MODAL })
    })
    return () => {
      document.removeEventListener('keyup', (e) => {
        e.key === 'Escape' && dispatch({ type: CLOSE_MODAL })
      })
    }
  }, [])

  return createPortal(
    <div className={style.modal}>
      {children}
      <ModalOverlay />
    </div>,
    reactModal
  )
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Modal
