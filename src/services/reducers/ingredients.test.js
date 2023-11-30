import { TSMap } from 'typescript-map'
import ingredientReducer, {
  fetchIngredientsData,
} from '../reducers/ingredients'

const initialState = {
  data: null,
  loading: false,
  error: false,
  ingredients: null,
}

global.fetch = jest.fn()

describe('test ingredients', () => {
  it('should fetch ingredients with resolved response', async () => {
    const mockIngredients = {
      success: true,
      data: [],
    }

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockIngredients),
    })

    const dispatch = jest.fn()
    const thunk = fetchIngredientsData()
    await thunk(dispatch)

    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)

    const [start, end] = calls

    expect(start[0].type).toBe(fetchIngredientsData.pending().type)
    expect(end[0].type).toBe(fetchIngredientsData.fulfilled().type)
    expect(end[0].payload).toBe(mockIngredients)
  })

  it('should fetch ingredients with error', async () => {
    fetch.mockRejectedValue({
      ok: false,
      status: 500,
    })

    const dispatch = jest.fn()
    const thunk = fetchIngredientsData()

    await thunk(dispatch).catch((error) => {
      expect(error).toEqual('Error 500')
    })
  })

  it('should return initial value', () => {
    expect(ingredientReducer(undefined, { type: 'any action' })).toEqual(
      initialState
    )
  })

  it('should change status with fetchIngredientsData.peding action', () => {
    const state = ingredientReducer(
      initialState,
      fetchIngredientsData.pending()
    )
    expect({ ...initialState, loading: true }).toEqual(state)
  })

  it('should change status with fetchIngredientsData.fulfilled action', () => {
    const payload = {
      _id: '123',
    }

    const result = new TSMap()
    result.set(payload._id, payload)

    const state = ingredientReducer(
      initialState,
      fetchIngredientsData.fulfilled({ data: [payload] })
    )

    expect({ ...initialState, ingredients: result, data: [payload] }).toEqual(
      state
    )
  })

  it('should change status with fetchIngredientsData.rejected action', () => {
    const state = ingredientReducer(
      initialState,
      fetchIngredientsData.rejected()
    )
    expect({ ...initialState, loading: false, error: true }).toEqual(state)
  })
})
