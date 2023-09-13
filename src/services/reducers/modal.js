import {
  OPEN_MODAL,
  CLOSE_MODAL,
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
} from '../actions/modal'

const initialState = {
  isModalActive: false,
  modalContent: null,
  orderRequest: false,
  orderFailed: false,
  orderData: null,
}

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        isModalActive: true,
        modalContent: action.content,
        orderRequest: false,
        orderFailed: false,
        orderData: null,
      }
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        isModalActive: false,
        modalContent: null,
        orderRequest: false,
        orderFailed: false,
        orderData: null,
      }
    }
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        isModalActive: true,
        orderRequest: true,
        orderFailed: false,
        orderData: null,
      }
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        isModalActive: true,
        orderRequest: false,
        orderFailed: false,
        orderData: action.items,
      }
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        isModalActive: true,
        modalContent: null,
        orderRequest: false,
        orderFailed: true,
        orderData: null,
      }
    }
    default:
      return state
  }
}
