import React from 'react'
import style from './ModalOverlay.module.css'
import { createPortal } from 'react-dom'
import Modal from '../Modal/Modal'
import PropTypes from 'prop-types'

const ModalOverlay = (props) => {
  const { modalData, setModalData } = props
  return createPortal(
    <div className={style.modalOverlay}>
      <div
        className={style.background}
        onClick={() => setModalData(null)}
      ></div>
      <Modal modalData={modalData} setModalData={setModalData} />
    </div>,
    document.body
  )
}

ModalOverlay.propTypes = {
  modalData: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  setModalData: PropTypes.func.isRequired,
}

export default ModalOverlay
