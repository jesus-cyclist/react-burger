import { createSlice } from '@reduxjs/toolkit'
import { createAsyncAction } from '../../utils/request'

export const fetchOrderData = createAsyncAction({
  prefix: 'order',
  route: 'orders',
})

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    data: null,
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderData.pending, (state) => {
        state.loading = true
        state.data = null
        state.loading = false
      })
      .addCase(fetchOrderData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchOrderData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default orderSlice.reducer
