import React from 'react'
import {
  SET_EXIT_PROFILE_ACTIVE,
  SET_PROFILE_DATA_ACTIVE,
  SET_ORDERS_LIST_ACTIVE,
} from '../../utils/profileNav'
import styles from './ProfileHint.module.css'

const ProfileHint = (props) => {
  const { activeTab } = props

  const hint = {
    SET_EXIT_PROFILE_ACTIVE: 'Автор не придумал до сих пор',
    SET_ORDERS_LIST_ACTIVE: 'Автор не придумал',
    SET_PROFILE_DATA_ACTIVE:
      'В этом разделе вы можете изменить свои персональные данные',
  }

  return <span className={styles.hint}>{hint[activeTab]}</span>
}

export default ProfileHint
