import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/hooks'
import { loginPath } from '../../utils/routerPath'

const ProtectedRoute = (props) => {
  const { element } = props
  const { isAuthenticated } = useAppSelector(
    (state) => state.rootReducer.profileData
  )

  return isAuthenticated ? element : <Navigate to={loginPath} replace />
}

export default ProtectedRoute
