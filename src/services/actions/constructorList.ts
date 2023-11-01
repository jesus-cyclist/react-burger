import { createAction } from '@reduxjs/toolkit'
import { TIngredient } from '../../utils/types'

export const addFilling = createAction<TIngredient>('ADD_FILLING')
export const addBuh = createAction<TIngredient>('ADD_BUH')
export const deleteFilling = createAction<string>('DELETE_FILLING')
export const clearConstructor = createAction('CLEAR_CONSTRUCTOR')
