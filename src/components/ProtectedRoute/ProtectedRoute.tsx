import React, { FC, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../hooks/hooks'
import { loginPath } from '../../utils/routerPath'

type TProtectedRouteProps = {
  onlyAuth?: boolean
  component: ReactNode
}

const ProtectedRoute = ({
  onlyAuth = false,
  component,
}: TProtectedRouteProps): JSX.Element => {
  const { isAuthenticated } = useAppSelector((state) => state.rootReducer.user)
  const location = useLocation()
  const from = location.state?.from || '/'

  if (!onlyAuth && isAuthenticated) {
    return <Navigate to={from} replace />
  }

  if (onlyAuth && !isAuthenticated) {
    return <Navigate to={loginPath} state={{ from: location }} replace />
  }

  return <>{component}</>
}

export default ProtectedRoute
