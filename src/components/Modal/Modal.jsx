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
  const { children, clearCounstructorIngredients } = props
  const dispatch = useAppDispatch()

  function closeModal() {
    dispatch({ type: CLOSE_MODAL })
    clearCounstructorIngredients()
  }

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

Modal.defaultProps = {
  clearCounstructorIngredients: () => {},
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  clearCounstructorIngredients: PropTypes.func.isRequired,
}

export default Modal
