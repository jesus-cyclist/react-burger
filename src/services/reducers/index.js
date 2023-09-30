import { combineReducers } from 'redux'
import { ingredientsReducer } from './IngredientsMenu'
import { constructorReducer } from './constructorList'
import { activeTabReducer } from './activeTab'
import { userDataReducer } from './userData'
import { orderReducer } from './order'

export const rootReducer = combineReducers({
  ingredientsMenu: ingredientsReducer,
  constructorList: constructorReducer,
  activeTab: activeTabReducer,
  profileData: userDataReducer,
  order: orderReducer,
})
