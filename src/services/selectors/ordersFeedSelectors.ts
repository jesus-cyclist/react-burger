import { RootState } from '../store'

export const getOrdersFeedData = (state: RootState) =>
  state.rootReducer.ordersFeed.data
