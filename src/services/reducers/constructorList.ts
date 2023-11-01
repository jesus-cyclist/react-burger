import { createReducer } from '@reduxjs/toolkit'
import {
  addBuh,
  addFilling,
  deleteFilling,
  clearConstructor,
} from '../actions/constructorList'
import uniqid from 'uniqid'
import { TIngredient } from '../../utils/types'

type TInitialState = {
  bun: TIngredient | {}
  filling: Array<TIngredient> | []
}

const initialState: TInitialState = {
  bun: {},
  filling: [],
}

export const constructorReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addBuh, (state, action) => {
      state.bun = action.payload
    })
    .addCase(addFilling, (state, action) => {
      const key = uniqid()
      const modifiedFilling = { ...action.payload, key }

      state.filling = [...state.filling, modifiedFilling]
    })
    .addCase(deleteFilling, (state, action) => {
      const arr = [...state.filling].filter(
        (item) => item.key !== action.payload
      )
      state.filling = arr
    })
    .addCase(clearConstructor, (state) => {
      state.bun = {}
      state.filling = []
    })
})
