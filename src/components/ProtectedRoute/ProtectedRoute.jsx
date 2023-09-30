import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/hooks'
import { homePagePath, loginPath } from '../../utils/routerPath'

const ProtectedRoute = ({ onlyAuth = false, component }) => {
  const { isAuthenticated } = useAppSelector(
    (state) => state.rootReducer.profileData
  )

  if (!onlyAuth && isAuthenticated) {
    return <Navigate to={homePagePath} replace />
  }

  if (onlyAuth && !isAuthenticated) {
    return <Navigate to={loginPath} replace />
  }

  return component
}

export default ProtectedRoute
