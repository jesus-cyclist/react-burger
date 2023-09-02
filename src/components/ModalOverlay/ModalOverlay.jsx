import React, { useEffect, useState } from 'react'
import style from './ModalOverlay.module.css'
import { createPortal } from 'react-dom'
import Modal from '../Modal/Modal'
import PropTypes from 'prop-types'

const reactModal = document.querySelector('#react-modals')

const ModalOverlay = (props) => {
  const [modalData, setModalData] = useState('')
  const { clickedElement, setClickedElement } = props

  useEffect(() => setModalData(clickedElement), [clickedElement])

  return createPortal(
    <div className={style.modalOverlay}>
      <div
        className={style.background}
        onClick={() => setClickedElement('')}
      ></div>
      <Modal modalData={modalData} setClickedElement={setClickedElement} />
    </div>,
    reactModal
  )
}

ModalOverlay.propTypes = {
  clickedElement: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
    }),
  ]).isRequired,
  setClickedElement: PropTypes.func.isRequired,
}

export default ModalOverlay
