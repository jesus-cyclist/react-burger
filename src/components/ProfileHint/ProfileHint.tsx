import React, { FC } from 'react'
import styles from './ProfileHint.module.css'
import { TActiveTab } from '../../utils/types'

type THintKeys =
  | 'SET_EXIT_PROFILE_ACTIVE'
  | 'SET_ORDERS_LIST_ACTIVE'
  | 'SET_PROFILE_DATA_ACTIVE'

const ProfileHint = (props: TActiveTab) => {
  const { activeTab } = props

  const hint = {
    SET_EXIT_PROFILE_ACTIVE: 'Автор не придумал до сих пор',
    SET_ORDERS_LIST_ACTIVE: 'Автор не придумал',
    SET_PROFILE_DATA_ACTIVE:
      'В этом разделе вы можете изменить свои персональные данные',
  }

  return <span className={styles.hint}>{hint[activeTab as THintKeys]}</span>
}

export default ProfileHint
