import React, { useEffect, FC } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Home from '../../pages/Home/Home'
import Login from '../../pages/Login/Login'
import Register from '../../pages/Register/Register'
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword'
import ResetPassword from '../../pages/ResetPassword/ResetPassword'
import Profile from '../../pages/Profile/Profile'
import AppHeader from '../AppHeader/AppHeader'
import styles from './App.module.css'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import Cookies from 'js-cookie'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { refreshToken } from '../../utils/token'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import {
  homePagePath,
  loginPath,
  registerPath,
  forgotPasswordPath,
  resetPasswordPath,
  profilePath,
  ingredientsPath,
  orderPath,
  ordersList,
} from '../../utils/routerPath'
import Modal from '../Modal/Modal'
import OrderDetails from '../OrderDetails/OrderDetails'
import { fetchIngredientsData } from '../../services/reducers/ingredients'
import { fetchCheckRefreshToken } from '../../services/reducers/user'
import { CLEAR_CONSTRUCTOR } from '../../services/actions/constructorList'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '../../services/selectors/userSelectors'

const App = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state

  const isAuthenticated = useSelector(selectIsAuthenticated)

  useEffect(() => {
    dispatch(fetchIngredientsData())
    const token = Cookies.get(refreshToken)
    if (token && !isAuthenticated) {
      const requestOptions = {
        body: { token },
      }
      //@ts-ignore
      dispatch(fetchCheckRefreshToken(requestOptions))
    }
  }, [])

  const closeModalIngredients = () => navigate(-1)
  const closeModalOrder = () => {
    closeModalIngredients()
    dispatch({ type: CLEAR_CONSTRUCTOR })
  }

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <Routes
          location={
            state?.ingredientsLocation || state?.orderLocation || location
          }
        >
          <Route path={homePagePath} element={<Home />} />
          <Route path={ordersList} element={<h2>Coming soon</h2>} />
          <Route
            path={`${ingredientsPath}/:id`}
            element={<IngredientDetails />}
          />
          <Route
            path={loginPath}
            element={<ProtectedRoute component={<Login />} />}
          />
          <Route
            path={registerPath}
            element={<ProtectedRoute component={<Register />} />}
          />
          <Route
            path={forgotPasswordPath}
            element={<ProtectedRoute component={<ForgotPassword />} />}
          />
          <Route
            path={resetPasswordPath}
            element={<ProtectedRoute component={<ResetPassword />} />}
          />
          <Route
            path={profilePath}
            element={<ProtectedRoute onlyAuth={true} component={<Profile />} />}
          />
        </Routes>
        {state?.ingredientsLocation && (
          <Routes>
            <Route
              path={`${ingredientsPath}/:id`}
              element={
                <Modal closeModal={closeModalIngredients}>
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
        {state?.orderLocation && (
          <Routes>
            <Route
              path={orderPath}
              element={
                <Modal closeModal={closeModalOrder}>
                  <OrderDetails />
                </Modal>
              }
            />
          </Routes>
        )}
      </main>
    </>
  )
}

export default App
