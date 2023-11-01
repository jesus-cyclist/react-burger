import { RootState } from '../store'

export const selectIsAuthenticated = (state: RootState) =>
  state.rootReducer.user.isAuthenticated

export const selectResponse = (state: RootState) =>
  state.rootReducer.user.userData.data
