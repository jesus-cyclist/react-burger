import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
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

function App() {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const state = location.state
  const { isAuthenticated } = useAppSelector((state) => state.rootReducer.user)

  useEffect(() => {
    dispatch(fetchIngredientsData())

    if (Cookies.get(refreshToken) && !isAuthenticated) {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: Cookies.get(refreshToken),
        }),
      }

      dispatch(fetchCheckRefreshToken(requestOptions))
    }
  }, [])

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
                <Modal>
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
                <Modal>
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
