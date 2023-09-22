import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import './styles/reset.css'
import App from './components/App/App'
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './services/reducers'
import { Provider } from 'react-redux'

const store = configureStore({
  reducer: {
    rootReducer,
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
