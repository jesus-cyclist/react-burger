import { WebsocketStatus } from '../../utils/types'
import {
  wsClose,
  wsConnecting,
  wsError,
  wsMessage,
  wsOpen,
} from '../actions/orderFeed'
import orderFeedReducer from './ordersFeed'

const initialState = {
  data: null,
  status: WebsocketStatus.OFFLINE,
  error: 'none',
}

describe('order feed test', () => {
  it('should switch status to connecting', () => {
    const state = orderFeedReducer(initialState, wsConnecting())

    expect({ ...initialState, status: WebsocketStatus.CONNECTING }).toEqual(
      state
    )
  })

  it('should switch status to online', () => {
    const state = orderFeedReducer(initialState, wsOpen())

    expect({ ...initialState, status: WebsocketStatus.ONLINE }).toEqual(state)
  })

  it('should switch status to Close', () => {
    const state = orderFeedReducer(initialState, wsClose())

    expect({ ...initialState, status: WebsocketStatus.OFFLINE }).toEqual(state)
  })

  it('should switch status to Error', () => {
    const error = 'error'
    const state = orderFeedReducer(initialState, wsError(error))

    expect({ ...initialState, status: WebsocketStatus.OFFLINE, error }).toEqual(
      state
    )
  })

  it('should switch status to Message', () => {
    const payload = { orders: [] }
    const state = orderFeedReducer(initialState, wsMessage(payload))

    expect({
      ...initialState,

      data: payload,
    }).toEqual(state)
  })
})
