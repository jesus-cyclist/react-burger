import { createAsyncAction } from '../../utils/request'
import { createSlice } from '@reduxjs/toolkit'
import { TIngredient } from '../../utils/types'
import { TSMap } from 'typescript-map'

export const fetchIngredientsData = createAsyncAction({
  prefix: 'ingredients',
  route: 'ingredients',
})

type TInitialState = {
  data: Array<TIngredient> | null
  loading: boolean
  error: boolean
  ingredients: TSMap<string, TIngredient> | null
}

const initialState: TInitialState = {
  data: null,
  loading: false,
  error: false,
  ingredients: null,
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsData.pending, (state) => {
        state.data = null
        state.loading = true
        state.error = false
        state.ingredients = null
      })
      .addCase(fetchIngredientsData.fulfilled, (state, action) => {
        const ingredients = new TSMap<string, TIngredient>()

        action.payload.data.forEach(
          (ingredient: TIngredient, index: number) => {
            ingredients.set(ingredient._id, ingredient)
          }
        )

        state.ingredients = ingredients
        state.data = action.payload.data
        state.loading = false
      })
      .addCase(fetchIngredientsData.rejected, (state, action) => {
        state.loading = false
        state.error = true
      })
  },
})

export default ingredientsSlice.reducer
