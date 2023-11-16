import {
  makeBunActive,
  makeSauceActive,
  makeMainActive,
  makeScroll,
} from '../actions/activeTab'
import { activeTabReducer } from './activeTab'

describe('Test switching tab', () => {
  const initialState = {
    elements: {
      bunTitlePosition: 0,
      sauceTitlePosition: 0,
      mainTitlePosition: 0,
    },
    current: 'bun',
  }

  it('should return the initial state', () => {
    expect(activeTabReducer(undefined, { type: 'some action' })).toEqual(
      initialState
    )
  })

  it('should return the bun active tab', () => {
    expect(activeTabReducer(undefined, { type: makeBunActive })).toEqual({
      ...initialState,
      current: 'bun',
    })
  })

  it('should return the sauce active tab', () => {
    expect(activeTabReducer(undefined, { type: makeSauceActive })).toEqual({
      ...initialState,
      current: 'sauce',
    })
  })

  it('should return the main active tab', () => {
    expect(activeTabReducer(undefined, { type: makeMainActive })).toEqual({
      ...initialState,
      current: 'main',
    })
  })

  it('should make scroll', () => {
    const payload = {
      bunDistance: 100,
      sauceDistance: 100,
      mainDistance: 100,
    }

    expect(
      activeTabReducer(initialState, {
        type: makeScroll,
        payload,
      })
    ).toEqual({
      ...initialState,
      elements: {
        bunTitlePosition: 100,
        sauceTitlePosition: 100,
        mainTitlePosition: 100,
      },
    })
  })
})
