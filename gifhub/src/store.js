import { combineReducers } from 'redux'
import userReducer from './services/reducers/user'
import themeSlice from './services/reducers/theme'
import giphySlice from './services/reducers/giphy'

export const rootReducer = combineReducers({
  user: userReducer,
  theme: themeSlice,
  giphy: giphySlice,
})
