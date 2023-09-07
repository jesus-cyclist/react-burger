import React, { useContext } from 'react'
import style from './ModalOverlay.module.css'
import { ModalDataContext } from '../../context/appContext'

const ModalOverlay = () => {
  const { closeModal } = useContext(ModalDataContext)

  return <div className={style.modalOverlay} onClick={closeModal} />
}

export default ModalOverlay
