import { RootState } from '../store'

export const selectActiveTab = (state: RootState) =>
  state.rootReducer.activeTab.current
