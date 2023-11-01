import { createReducer } from '@reduxjs/toolkit'
import {
  makeBunActive,
  makeSauceActive,
  makeMainActive,
  makeScroll,
} from '../actions/activeTab'

const initialState = {
  elements: {
    bunTitlePosition: 0,
    sauceTitlePosition: 0,
    mainTitlePosition: 0,
  },
  current: 'bun',
}

export const activeTabReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(makeBunActive, (state) => {
      state.current = 'bun'
    })
    .addCase(makeSauceActive, (state) => {
      state.current = 'main'
    })
    .addCase(makeMainActive, (state) => {
      state.current = 'sauce'
    })
    .addCase(makeScroll, (state, action) => {
      const { bunDistance, sauceDistance, mainDistance } = action.payload

      console.log(bunDistance, sauceDistance, mainDistance)

      const minValue = Math.min(
        ...[bunDistance, sauceDistance, mainDistance].filter(
          (item) => item > 50
        )
      )

      const nearTitle =
        bunDistance === minValue
          ? 'bun'
          : sauceDistance === minValue
          ? 'sauce'
          : 'main'

      return {
        ...state,
        elements: {
          ...state.elements,
          bunTitlePosition: bunDistance,
          sauceTitlePosition: sauceDistance,
          mainTitlePosition: mainDistance,
        },
        current: nearTitle,
      }
    })
})
