import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  REDUCE_COUNT_ITEM,
  INCREASE_COUNT_ITEM,
} from '../actions/ingredientsMenu'

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  downloadedSuccess: false,
}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
        downloadedSuccess: false,
      }
    }
    case GET_ITEMS_SUCCESS: {
      const ingredients = action.items.data.map((item) => {
        return { ...item, count: 0 }
      })

      return {
        ...state,
        ingredientsRequest: false,
        ingredients: ingredients,
        downloadedSuccess: true,
      }
    }

    case GET_ITEMS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
        downloadedSuccess: false,
      }
    }

    default: {
      return state
    }
  }
}
