import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { rootReducer } from './reducers'
import { socketMiddleware } from './middleware/socketMiddleware'
import {
  connect as OrderFeedWsConnect,
  disconnect as OrderFeedWsDisconnect,
  wsConnecting as OrderFeedWsConnecting,
  wsOpen as OrderFeedWsOpen,
  wsClose as OrderFeedWsClose,
  wsMessage as OrderFeedWsNessage,
  wsError as OrderFeedWsError,
} from './actions/orderFeed'
import {
  connectProfile as ProfileOrderFeedWsConnect,
  disconnectProfile as ProfileOrderFeedWsDisconnect,
  wsConnectingProfile as ProfileOrderFeedWsConnecting,
  wsOpenProfile as ProfileOrderFeedWsOpen,
  wsCloseProfile as ProfileOrderFeedWsClose,
  wsMessageProfile as ProfileOrderFeedWsNessage,
  wsErrorProfile as ProfileOrderFeedWsError,
} from './actions/orderFeed'

const wsActions = {
  wsConnect: OrderFeedWsConnect,
  wsDisconnect: OrderFeedWsDisconnect,
  wsConnecting: OrderFeedWsConnecting,
  onOpen: OrderFeedWsOpen,
  onClose: OrderFeedWsClose,
  onError: OrderFeedWsError,
  onMessage: OrderFeedWsNessage,
}
const wsActionsProfile = {
  wsConnect: ProfileOrderFeedWsConnect,
  wsDisconnect: ProfileOrderFeedWsDisconnect,
  wsConnecting: ProfileOrderFeedWsConnecting,
  onOpen: ProfileOrderFeedWsOpen,
  onClose: ProfileOrderFeedWsClose,
  onError: ProfileOrderFeedWsError,
  onMessage: ProfileOrderFeedWsNessage,
}

const liveOrderFeed = socketMiddleware(wsActions)
const liveProfileOrderFeed = socketMiddleware(wsActionsProfile)

export const store = configureStore({
  reducer: {
    rootReducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      liveOrderFeed,
      liveProfileOrderFeed
    )
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
