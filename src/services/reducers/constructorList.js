import {
  ADD_BUH,
  ADD_FILLING,
  DELETE_FILLING,
} from '../actions/constructorList'
import uniqid from 'uniqid'

const initialState = {
  bun: {},
  filling: [],
  draggableTarget: null,
  dropTarget: null,
}

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUH: {
      return {
        ...state,
        bun: action.item,
      }
    }

    case ADD_FILLING: {
      const key = uniqid()
      const modifiedFilling = { ...action.item, key }
      return {
        ...state,
        filling: [...state.filling, modifiedFilling],
      }
    }

    case DELETE_FILLING: {
      const arr = [...state.filling].filter((item) => item.key !== action.id)
      return {
        ...state,
        filling: arr,
      }
    }
    default: {
      return state
    }
  }
}
