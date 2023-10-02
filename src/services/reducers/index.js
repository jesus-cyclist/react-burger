import { combineReducers } from 'redux'
import ingredientsReducer from './ingredients'
import { constructorReducer } from './constructorList'
import { activeTabReducer } from './activeTab'
import userReduser from './user'
import orderReducer from './order'

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorList: constructorReducer,
  activeTab: activeTabReducer,
  user: userReduser,
  order: orderReducer,
})
