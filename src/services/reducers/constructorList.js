import {
  ADD_BUH,
  ADD_FILLING,
  DELETE_BUH,
  DELETE_FILLING,
} from '../actions/constructorList'

const initialState = {
  buh: null,
  filling: [],
  totalAmount: 0,
}

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUH: {
      return {
        ...state,
        buh: action.item,
        totalAmount: (state.totalAmount += action.item.price),
      }
    }

    case ADD_FILLING: {
      return {
        ...state,
        filling: [...state.filling, action.item],
      }
    }

    case DELETE_BUH: {
      return {
        ...state,
        buh: null,
      }
    }
    case DELETE_FILLING: {
      return {
        ...state,
        filling: [...state.filling].filter((item, ind) => ind !== action.ind),
      }
    }
    default: {
      return state
    }
  }
}
