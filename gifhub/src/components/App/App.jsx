import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import {
  loginPagePath,
  homePagePath,
  postPath,
  createCollectionPath,
} from '../../constants/path'
import Header from '../Header/Header'
import styles from './App.module.css'
import { useSelector } from 'react-redux'
import Home from '../../pages/Home/Home'
import Login from '../../pages/Login/Login'
import Modal from '../Modal/Modal'
import PostDetail from '../../pages/PostDetail/PostDetail'
import CreateNewCollection from '../Modal/CreateNewCollection/CreateNewCollection'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

const App = () => {
  const { isDarkModeActive } = useSelector((store) => store.rootReducer.theme)
  const location = useLocation()
  const state = location.state

  return (
    <div
      className={
        isDarkModeActive
          ? `${styles.wrapper} ${styles.wrapperDark}`
          : `${styles.wrapper} ${styles.wrapperLight}`
      }
    >
      <div className={styles.app}>
        <Header />
        <Routes
          location={state?.postDetail || state?.createCollection || location}
        >
          <Route
            path={homePagePath}
            element={<ProtectedRoute component={<Home />} />}
          />

          <Route
            path={loginPagePath}
            element={
              <ProtectedRoute isAuthOnly={false} component={<Login />} />
            }
          />
        </Routes>
        {state?.createCollection && (
          <Routes>
            <Route
              path={createCollectionPath}
              element={
                <ProtectedRoute
                  component={
                    <Modal>
                      <CreateNewCollection />
                    </Modal>
                  }
                />
              }
            />
          </Routes>
        )}
        {state?.postDetail && (
          <Routes>
            <Route
              path={`${postPath}/:id`}
              element={
                <ProtectedRoute
                  component={
                    <Modal>
                      <PostDetail />
                    </Modal>
                  }
                />
              }
            />
          </Routes>
        )}
      </div>
    </div>
  )
}

export default App
