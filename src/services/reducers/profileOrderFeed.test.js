import { WebsocketStatus } from '../../utils/types'
import {
  wsCloseProfile,
  wsConnectingProfile,
  wsErrorProfile,
  wsMessageProfile,
  wsOpenProfile,
} from '../actions/orderFeed'
import profileOrderFeedReducer from './profileOrderFeed'

const initialState = {
  data: null,
  status: WebsocketStatus.OFFLINE,
  error: 'none',
}

describe('order feed test', () => {
  it('should switch status to connecting', () => {
    const state = profileOrderFeedReducer(initialState, wsConnectingProfile())

    expect({ ...initialState, status: WebsocketStatus.CONNECTING }).toEqual(
      state
    )
  })

  it('should switch status to online', () => {
    const state = profileOrderFeedReducer(initialState, wsOpenProfile())

    expect({ ...initialState, status: WebsocketStatus.ONLINE }).toEqual(state)
  })

  it('should switch status to Close', () => {
    const state = profileOrderFeedReducer(initialState, wsCloseProfile())

    expect({ ...initialState, status: WebsocketStatus.OFFLINE }).toEqual(state)
  })

  it('should switch status to Error', () => {
    const error = 'error'
    const state = profileOrderFeedReducer(initialState, wsErrorProfile(error))

    expect({ ...initialState, status: WebsocketStatus.OFFLINE, error }).toEqual(
      state
    )
  })

  it('should switch status to Message', () => {
    const payload = { orders: [] }
    const state = profileOrderFeedReducer(
      initialState,
      wsMessageProfile(payload)
    )

    expect({
      ...initialState,

      data: payload,
    }).toEqual(state)
  })
})
