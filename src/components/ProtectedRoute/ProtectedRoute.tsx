import React, { FC, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../hooks/hooks'
import { loginPath } from '../../utils/routerPath'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '../../services/selectors/userSelectors'

type TProtectedRouteProps = {
  onlyAuth?: boolean
  component: ReactNode
}

const ProtectedRoute = ({
  onlyAuth = false,
  component,
}: TProtectedRouteProps): JSX.Element => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
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
