import uniqid from 'uniqid'
import { addBuh, addFilling } from '../actions/constructorList'

import { constructorReducer } from './constructorList'

jest.mock('uniqid')

describe('test construstor list', () => {
  const initialState = {
    bun: null,
    filling: null,
  }

  const payload = {
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    image: '',
    image_large: '',
    image_mobile: '',
    name: '',
    price: 0,
    proteins: 0,
    type: '',
    __v: 0,
    _id: '',
  }

  it('should return initial value', () => {
    expect(constructorReducer(undefined, { type: 'anu action' })).toEqual(
      initialState
    )
  })

  it('should add bun', () => {
    expect(constructorReducer(initialState, { type: addBuh, payload })).toEqual(
      {
        filling: null,
        bun: payload,
      }
    )
  })

  it('should add filling when array is empty', () => {
    const modifiedFilling = { ...payload, key: 'lowmlkrt' }

    uniqid.mockReturnValue('lowmlkrt')

    expect(
      constructorReducer(initialState, {
        type: addFilling,
        payload: payload,
      })
    ).toEqual({
      ...initialState,
      filling: [modifiedFilling],
    })
  })

  it('should add filling when array is non empty', () => {
    const modifiedFilling = { ...payload, key: 'lowmlkrt' }

    uniqid.mockReturnValue('lowmlkrt')

    expect(
      constructorReducer(
        { ...initialState, filling: [modifiedFilling] },
        {
          type: addFilling,
          payload: payload,
        }
      )
    ).toEqual({ ...initialState, filling: [modifiedFilling, modifiedFilling] })
  })
})
