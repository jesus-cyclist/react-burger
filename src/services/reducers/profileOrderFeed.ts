import { createSlice } from '@reduxjs/toolkit'
import { TOrders, WebsocketStatus } from '../../utils/types'
import {
  wsCloseProfile,
  wsConnectingProfile,
  wsErrorProfile,
  wsMessageProfile,
  wsOpenProfile,
} from '../actions/orderFeed'

type TOrderFeedInitial = {
  data: null | TOrders
  status: WebsocketStatus
  error: string
}
type TOrderFeedSlice = {
  name: string
  initialState: TOrderFeedInitial
  reducers: { [key: string]: () => void }
}

const profileOrdersFeedSlice = createSlice({
  name: 'profileOrdersFeed',
  initialState: {
    data: null,
    status: WebsocketStatus.OFFLINE,
    error: 'none',
  } as TOrderFeedInitial,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(wsConnectingProfile, (state) => {
        state.status = WebsocketStatus.CONNECTING
      })
      .addCase(wsOpenProfile, (state) => {
        state.status = WebsocketStatus.ONLINE
        state.error = ''
      })
      .addCase(wsCloseProfile, (state) => {
        state.status = WebsocketStatus.OFFLINE
      })
      .addCase(wsErrorProfile, (state, action) => {
        state.error = action.payload
      })
      .addCase(wsMessageProfile, (state, action) => {
        const sortedData = {
          ...action.payload,
          orders: action.payload.orders.sort((a, b) => b.number - a.number),
        }
        state.data = sortedData
      })
  },
})

export default profileOrdersFeedSlice.reducer
