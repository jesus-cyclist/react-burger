import {
  MAKE_BUN_ACTIVE,
  MAKE_MAIN_ACTIVE,
  MAKE_SAUCE_ACTIVE,
  SCROLL,
} from '../actions/activeTab'

const initialState = {
  elements: {
    bunTitlePosition: 0,
    sauceTitlePosition: 0,
    mainTitlePosition: 0,
  },
  current: 'bun',
}

export const activeTabReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_BUN_ACTIVE: {
      return {
        ...state,
        current: 'bun',
      }
    }
    case MAKE_MAIN_ACTIVE: {
      return {
        ...state,
        current: 'main',
      }
    }
    case MAKE_SAUCE_ACTIVE: {
      return {
        ...state,
        current: 'sauce',
      }
    }
    case SCROLL: {
      const { bunDistance, sauceDistance, mainDistance } = action.distance

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
    }
    default: {
      return state
    }
  }
}
