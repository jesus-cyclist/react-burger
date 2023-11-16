import { RootState } from '../store'

export const selectFilling = (state: RootState) =>
  state.rootReducer.constructorList.filling

export const selectBun = (state: RootState) =>
  state.rootReducer.constructorList.bun
