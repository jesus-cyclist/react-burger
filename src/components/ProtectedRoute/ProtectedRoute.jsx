import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../hooks/hooks'
import { loginPath } from '../../utils/routerPath'

const ProtectedRoute = ({ onlyAuth = false, component }) => {
  const { isAuthenticated } = useAppSelector((state) => state.rootReducer.user)
  const location = useLocation()
  const from = location.state?.from || '/'

  if (!onlyAuth && isAuthenticated) {
    return <Navigate to={from} replace />
  }

  if (onlyAuth && !isAuthenticated) {
    return <Navigate to={loginPath} state={{ from: location }} replace />
  }

  return component
}

export default ProtectedRoute
