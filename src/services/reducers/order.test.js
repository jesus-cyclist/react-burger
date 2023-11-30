import orderReducer, { fetchOrderData } from './order'

const initialState = {
  data: null,
  loading: false,
  error: false,
}

global.fetch = jest.fn()

describe('test order', () => {
  it('should return initial value', () => {
    expect(orderReducer(undefined, { type: 'any action' })).toEqual(
      initialState
    )
  })

  it('should fetch order with resolved response', async () => {
    const orderData = {
      success: true,
      data: {},
    }

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(orderData),
    })

    const thunk = fetchOrderData()
    const dispatch = jest.fn()

    await thunk(dispatch)

    const [start, end] = dispatch.mock.calls

    expect(dispatch.mock.calls).toHaveLength(2)
    expect(start[0].type).toEqual(fetchOrderData.pending().type)
    expect(end[0].type).toEqual(fetchOrderData.fulfilled().type)
  })

  it('should fetch order with error', async () => {
    fetch.mockRejectedValue({
      ok: false,
      status: 500,
    })

    const dispatch = jest.fn()
    const thunk = fetchOrderData()

    await thunk(dispatch).catch((error) => {
      expect(error).toEqual('Error 500')
    })
  })

  it('should change status with fetchIngredientsData.pending action', () => {
    const state = orderReducer(initialState, fetchOrderData.pending())

    expect({ ...initialState, loading: true }).toEqual(state)
  })

  it('should change status with fetchIngredientsData.fullfield action', () => {
    const payload = {}

    const state = orderReducer(initialState, fetchOrderData.fulfilled(payload))

    expect({ ...initialState, data: payload }).toEqual(state)
  })

  it('should change status with fetchIngredientsData.rejected action', () => {
    const state = orderReducer(initialState, fetchOrderData.rejected())

    expect({ ...initialState, error: true }).toEqual(state)
  })
})
