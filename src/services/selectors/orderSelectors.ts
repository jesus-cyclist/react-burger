import { RootState } from '../store'

export const selectOrder = (state: RootState) => state.rootReducer.order.data
