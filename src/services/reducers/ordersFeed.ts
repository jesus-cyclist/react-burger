import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TOrders, WebsocketStatus } from '../../utils/types'
import {
  TFeedActions,
  wsClose,
  wsConnecting,
  wsError,
  wsMessage,
  wsOpen,
} from '../actions/orderFeed'

type TOrderFeedInitial = {
  data: null | TOrders
  status: WebsocketStatus
  error: string
}

const initialState: TOrderFeedInitial = {
  data: null,
  status: WebsocketStatus.OFFLINE,
  error: 'none',
}

const orderFeedSlice = createSlice({
  name: 'orderFeed',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(wsConnecting, (state) => {
        state.status = WebsocketStatus.CONNECTING
      })
      .addCase(wsOpen, (state) => {
        state.status = WebsocketStatus.ONLINE
        state.error = ''
      })
      .addCase(wsClose, (state) => {
        state.status = WebsocketStatus.OFFLINE
      })
      .addCase(wsError, (state, action) => {
        state.error = action.payload
      })
      .addCase(wsMessage, (state, action) => {
        const sortedData = {
          ...action.payload,
          orders: action.payload.orders.sort((a, b) => b.number - a.number),
        }
        state.data = sortedData
      })
  },
})

export default orderFeedSlice.reducer
