import React from 'react'
import ModalOverlay from './ModalOverlay/ModalOverlay'
import styles from './Modal.module.css'
import { createPortal } from 'react-dom'
import CustomButton from '../UI/CustomButton/CustomButton'
import { ReactComponent as CloseSvg } from './../../assets/svg/close-o.svg'
import { useNavigate } from 'react-router-dom'

const modalRoot = document.getElementById('modal-root')

const Modal = (props) => {
  const { children } = props
  const navigate = useNavigate()

  //navigate(-1)  нельзя это делать внутри Modal. Это хардкод действий, который может быть не нужен в будущем для других попапов. В этом смысл выноса этой логики наружу. Нужно передавать в пропсы функцию onClose
  const onClose = () => {
    navigate(-1)
  }

  return createPortal(
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <CustomButton
          type={'button'}
          alignment={'right'}
          onClick={onClose}
          icon={<CloseSvg width={'50px'} height={'50px'} />}
          isScalabale={true}
        />
        {children}
      </div>
      <ModalOverlay closeModal={onClose} />
    </div>,
    modalRoot
  )
}

export default Modal
