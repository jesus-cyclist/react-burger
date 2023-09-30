import {
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
} from '../actions/order'

const initialState = {
  request: false,
  failed: false,
  success: false,
  response: null,
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        request: true,
        failed: false,
        success: false,
        response: null,
      }
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        request: false,
        success: true,
        response: action.payload,
      }
    }

    case GET_ORDER_FAILED: {
      return {
        ...state,
        request: false,
        failed: true,
      }
    }

    default: {
      return state
    }
  }
}
