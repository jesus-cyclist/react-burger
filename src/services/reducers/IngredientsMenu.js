import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
} from '../actions/ingredientsMenu'

const initialState = {
  ingredients: [],
  totalAmount: 0,
  filling: [],
  bread: [],
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
        totalAmount: 0,
        filling: [],
        bread: [],
      }
    }
    case GET_ITEMS_SUCCESS: {
      const bread = 'bun'

      const breadId = action.items.data.find((item) => item.type === bread)

      const fillingId = action.items.data.filter((item) => item.type !== bread)

      const totalAmount = action.items.data.reduce(
        (acc, item) => (acc += item.price),
        0
      )

      return {
        ...state,
        ingredientsRequest: false,
        ingredients: action.items,
        downloadedSuccess: true,
        totalAmount: totalAmount,
        filling: fillingId,
        bread: breadId,
      }
    }

    case GET_ITEMS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
        downloadedSuccess: false,
        totalAmount: 0,
        filling: [],
        bread: [],
      }
    }
    default: {
      return state
    }
  }
}
