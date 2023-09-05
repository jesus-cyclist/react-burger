import React from 'react'
import style from './ModalOverlay.module.css'
import PropTypes from 'prop-types'

const ModalOverlay = (props) => {
  const { closeModal } = props
  return <div className={style.modalOverlay} onClick={closeModal} />
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
}

export default ModalOverlay
