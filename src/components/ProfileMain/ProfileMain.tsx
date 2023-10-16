import React, { FC } from 'react'
import ProfileData from '../ProfileData/ProfileData'
import { SET_PROFILE_DATA_ACTIVE } from '../../utils/profileNav'
import { TActiveTab } from '../../utils/types'

const ProfileMain = (props: TActiveTab): JSX.Element => {
  const { activeTab } = props
  return <>{activeTab === SET_PROFILE_DATA_ACTIVE && <ProfileData />}</>
}

export default ProfileMain
