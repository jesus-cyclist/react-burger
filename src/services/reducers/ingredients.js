import { createAsyncAction } from '../../utils/request'
import { createSlice } from '@reduxjs/toolkit'
import { Map } from 'immutable'

export const fetchIngredientsData = createAsyncAction({
  prefix: 'ingredients',
  route: 'ingredients',
})

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    data: null,
    loading: false,
    error: false,
    ingredients: null,
  },
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
        const ingredients = new Map()

        action.payload.data.forEach((ingredient) => {
          return (ingredients[ingredient._id] = ingredient)
        })

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
