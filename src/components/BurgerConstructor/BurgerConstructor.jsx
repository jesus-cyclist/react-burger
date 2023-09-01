import React, { useEffect, useState } from 'react'
import style from './BurgerConstructor.module.css'
import BurgerConstructorList from '../BurgerConstructorList/BurgerConstructorList'
import { request } from '../../utils/request'
import PropTypes from 'prop-types'

const BurgerConstructor = (props) => {
  const [order, setOrder] = useState([])
  const { setModalData } = props
  useEffect(() => {
    const url = 'https://norma.nomoreparties.space/api/ingredients'
    request(url, order, setOrder)
  }, [])
  return (
    <div className={style.column}>
      {order.length === 0 ? (
        <h2>loading</h2>
      ) : (
        <BurgerConstructorList order={order} setModalData={setModalData} />
      )}
    </div>
  )
}

BurgerConstructor.propsTypes = {
  setModalData: PropTypes.func.isRequired,
}

export default BurgerConstructor
