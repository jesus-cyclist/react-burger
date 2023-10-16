//@ts-ignore
export const selectIsAuthenticated = (state) =>
  state.rootReducer.user.isAuthenticated
//@ts-ignore
export const selectResponse = (state) => state.rootReducer.user.userData.data
