import React from 'react'
import style from './Modal.module.css'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import OrderDetails from '../OrderDetails/OrderDetails'
import PropTypes from 'prop-types'

const Modal = (props) => {
  const { modalData, setModalData } = props
  return (
    <div
      className={
        modalData === 'order'
          ? style.modal + ' ' + style.modalOrder
          : style.modal
      }
    >
      {modalData === 'order' ? (
        <OrderDetails />
      ) : (
        <IngredientDetails modalData={modalData} setModalData={setModalData} />
      )}
    </div>
  )
}

Modal.propTypes = {
  modalData: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  setModalData: PropTypes.func.isRequired,
}

export default Modal
