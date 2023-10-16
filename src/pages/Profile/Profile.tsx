import React, { useState } from 'react'
import styles from './Profile.module.css'
import { SET_PROFILE_DATA_ACTIVE } from '../../utils/profileNav'
import ProfileNav from '../../components/ProfileNav/ProfileNav'
import ProfileMain from '../../components/ProfileMain/ProfileMain'

const Profile = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState(SET_PROFILE_DATA_ACTIVE)

  const onClickHandler = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <div className={styles.wrapper}>
      <ProfileNav activeTab={activeTab} onClickHandler={onClickHandler} />
      <ProfileMain activeTab={activeTab} />
    </div>
  )
}

export default Profile
