import { RootState } from '../store'

export const selectIngredients = (state: RootState) =>
  state.rootReducer.ingredients.data

export const selectIngredientsMap = (state: RootState) =>
  state.rootReducer.ingredients.ingredients
