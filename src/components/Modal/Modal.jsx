import React, { useEffect } from 'react'
import style from './Modal.module.css'
import PropTypes from 'prop-types'
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import { createPortal } from 'react-dom'
import { useAppDispatch } from '../../hooks/hooks'
import { CLOSE_MODAL } from '../../services/actions/modal'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const reactModal = document.querySelector('#react-modals')

const Modal = (props) => {
  const { children } = props
  const dispatch = useAppDispatch()

  function escapeHandler(event) {
    event.key === 'Escape' && dispatch({ type: CLOSE_MODAL })
  }

  useEffect(() => {
    document.addEventListener('keyup', (e) => escapeHandler(e))
    return () => {
      document.removeEventListener('keyup', (e) => escapeHandler(e))
    }
  }, [])

  return createPortal(
    <div className={style.wrapper}>
      <div className={style.modal}>
        <button className={style.modalCloseButton}>
          <CloseIcon
            type={'primary'}
            onClick={() => dispatch({ type: CLOSE_MODAL })}
          />
        </button>
        {children}
      </div>
      <ModalOverlay />
    </div>,
    reactModal
  )
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Modal
