import { combineReducers } from 'redux'
import { ingredientsReducer } from './IngredientsMenu'
import { modalReducer } from './modal'
import { constructorReducer } from './constructorList'
import { activeTabReducer } from './activeTab'
import { userDataReducer } from './userData'

export const rootReducer = combineReducers({
  ingredientsMenu: ingredientsReducer,
  modal: modalReducer,
  constructorList: constructorReducer,
  activeTab: activeTabReducer,
  profileData: userDataReducer,
})
