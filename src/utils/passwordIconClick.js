export function showPassword(state, setState) {
  setState({
    ...state,
    passwordType: state.passwordType === 'password' ? 'text' : 'password',
  })
}
