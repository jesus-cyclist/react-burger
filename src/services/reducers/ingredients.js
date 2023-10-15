import { createAsyncAction } from '../../utils/request'
import { createSlice } from '@reduxjs/toolkit'

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
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsData.pending, (state) => {
        state.data = null
        state.loading = true
        state.error = false
      })
      .addCase(fetchIngredientsData.fulfilled, (state, action) => {
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
