import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import Feed from '../../pages/Feed/Feed'
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword'
import Home from '../../pages/Home/Home'
import Login from '../../pages/Login/Login'
import Profile from '../../pages/Profile/Profile'
import Register from '../../pages/Register/Register'
import ResetPassword from '../../pages/ResetPassword/ResetPassword'
import { clearConstructor } from '../../services/actions/constructorList'
import {
  connect as connectOrderFeed,
  disconnect as disconnectOrderFeed,
} from '../../services/actions/orderFeed'
import { fetchIngredientsData } from '../../services/reducers/ingredients'
import { logout, setIsAuthenticated } from '../../services/reducers/user'
import { selectIsAuthenticated } from '../../services/selectors/userSelectors'
import { socketPath } from '../../utils/request'
import {
  feed,
  forgotPasswordPath,
  homePagePath,
  ingredientsPath,
  loginPath,
  orderPath,
  profileOrders,
  profilePath,
  registerPath,
  resetPasswordPath,
} from '../../utils/routerPath'
import { accessToken, refreshToken } from '../../utils/token'
import AppHeader from '../AppHeader/AppHeader'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import Modal from '../Modal/Modal'
import OrderDetails from '../OrderDetails/OrderDetails'
import OrderFeedDeatails from '../OrderFeedDeatails/OrderFeedDeatails'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import styles from './App.module.css'

const App = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  useEffect(() => {
    const token = Cookies.get(refreshToken)
    if (token && !isAuthenticated) {
      axios
        .post(
          'https://norma.nomoreparties.space/api/auth/token',
          { token },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((res) => {
          Cookies.set(refreshToken, res.data.refreshToken, {
            expires: 1,
          })
          Cookies.set(accessToken, res.data.accessToken.split(' ')[1], {
            expires: 1,
          })
          dispatch(setIsAuthenticated())
        })
        .catch((e) => dispatch(logout()))
    }
  }, [isAuthenticated])

  useEffect(() => {
    dispatch(fetchIngredientsData(null))

    dispatch(connectOrderFeed(socketPath))
    return () => {
      dispatch(disconnectOrderFeed())
    }
  }, [])

  const closeModalIngredients = () => navigate(-1)
  const closeModalOrder = () => {
    closeModalIngredients()
    dispatch(clearConstructor())
  }

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <Routes
          location={
            state?.ingredientsLocation ||
            state?.orderLocation ||
            state?.orderFeed ||
            state?.profileOrderFeed ||
            location
          }
        >
          <Route path={homePagePath} element={<Home />} />
          <Route
            path={`${ingredientsPath}/:id`}
            element={<IngredientDetails />}
          />
          <Route path={feed} element={<Feed />} />
          <Route path={`${feed}/:id`} element={<OrderFeedDeatails />} />
          <Route
            path={`${profileOrders}/:id`}
            element={<OrderFeedDeatails />}
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
        {state?.orderFeed && (
          <Routes>
            <Route
              path={`${feed}/:id`}
              element={
                <Modal closeModal={closeModalOrder}>
                  {<OrderFeedDeatails />}
                </Modal>
              }
            />
          </Routes>
        )}
        {state?.profileOrderFeed && (
          <Routes>
            <Route
              path={`${profileOrders}/:id`}
              element={
                <Modal closeModal={closeModalOrder}>
                  {<OrderFeedDeatails />}
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
