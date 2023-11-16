import { createSlice } from '@reduxjs/toolkit'
import { createAsyncAction } from '../../utils/request'
import { TOrder } from '../../utils/types'

export const fetchOrderData = createAsyncAction({
  prefix: 'order',
  route: 'orders',
  method: 'POST',
})

type TResponseData = {
  name: string
  order: TOrder
  success: boolean
}

type TInitialState = {
  data: TResponseData | null
  loading: boolean
  error: boolean
}

const initialState: TInitialState = {
  data: null,
  loading: false,
  error: false,
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderData.pending, (state) => {
        state.loading = true
        state.data = null
        state.error = false
      })
      .addCase(fetchOrderData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchOrderData.rejected, (state) => {
        state.loading = false
        state.error = true
      })
  },
})

export default orderSlice.reducer
