import React from 'react'
import PropTypes from 'prop-types'
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

ProfileHint.propTypes = {
  activeTab: PropTypes.string.isRequired,
}

export default ProfileHint
