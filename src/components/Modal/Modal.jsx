import React from 'react'
import style from './Modal.module.css'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import OrderDetails from '../OrderDetails/OrderDetails'
import PropTypes from 'prop-types'

const Modal = (props) => {
  const { modalData, setClickedElement } = props
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
        <IngredientDetails
          modalData={modalData}
          setClickedElement={setClickedElement}
        />
      )}
    </div>
  )
}

Modal.propTypes = {
  modalData: PropTypes.oneOfType([
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

export default Modal
