import React from 'react'
import ProfileData from '../ProfileData/ProfileData'
import {
  SET_EXIT_PROFILE_ACTIVE,
  SET_ORDERS_LIST_ACTIVE,
  SET_PROFILE_DATA_ACTIVE,
} from '../../utils/profileNav'

const ProfileMain = (props) => {
  const { activeTab } = props
  return <>{activeTab === SET_PROFILE_DATA_ACTIVE && <ProfileData />}</>
}

export default ProfileMain
