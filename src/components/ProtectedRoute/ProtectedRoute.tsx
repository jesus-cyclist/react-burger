import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../hooks/hooks'
import { selectIsAuthenticated } from '../../services/selectors/userSelectors'
import { loginPath } from '../../utils/routerPath'

type TProtectedRouteProps = {
  onlyAuth?: boolean
  component: ReactNode
}

const ProtectedRoute = ({
  onlyAuth = false,
  component,
}: TProtectedRouteProps): JSX.Element => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
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
