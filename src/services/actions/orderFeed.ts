import { createAction } from '@reduxjs/toolkit'
import { TOrders } from '../../utils/types'

export const connect = createAction<string, 'ORDER_FEED_CONNECT'>(
  'ORDER_FEED_CONNECT'
)
export const disconnect = createAction('ORDER_FEED_DISCONNECT')
export const wsConnecting = createAction('ORDER_FEED_WS_CONNECTING')
export const wsOpen = createAction('ORDER_FEED_WS_OPEN')
export const wsClose = createAction('ORDER_FEED_WS_CLOSE')
export const wsMessage = createAction<TOrders, 'ORDER_FEED_WS_MESSAGE'>(
  'ORDER_FEED_WS_MESSAGE'
)
export const wsError = createAction<string, 'ORDER_FEED_WS_ERROR'>(
  'ORDER_FEED_WS_ERROR'
)

export const connectProfile = createAction<
  string,
  'PROFILE_ORDER_FEED_CONNECT'
>('PROFILE_ORDER_FEED_CONNECT')
export const disconnectProfile = createAction('PROFILE_ORDER_FEED_DISCONNECT')
export const wsConnectingProfile = createAction(
  'PROFILE_ORDER_FEED_WS_CONNECTING'
)
export const wsOpenProfile = createAction('PROFILE_ORDER_FEED_WS_OPEN')
export const wsCloseProfile = createAction('PROFILE_ORDER_FEED_WS_CLOSE')
export const wsMessageProfile = createAction<
  TOrders,
  'PROFILE_ORDER_FEED_WS_MESSAGE'
>('PROFILE_ORDER_FEED_WS_MESSAGE')
export const wsErrorProfile = createAction<
  string,
  'PROFILE_ORDER_FEED_WS_ERROR'
>('PROFILE_ORDER_FEED_WS_ERROR')

export type TFeedActions =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsMessage>
  | ReturnType<typeof wsError>
  | ReturnType<typeof connectProfile>
  | ReturnType<typeof disconnectProfile>
  | ReturnType<typeof wsConnectingProfile>
  | ReturnType<typeof wsOpenProfile>
  | ReturnType<typeof wsCloseProfile>
  | ReturnType<typeof wsMessageProfile>
  | ReturnType<typeof wsErrorProfile>
