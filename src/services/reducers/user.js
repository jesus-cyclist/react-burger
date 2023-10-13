import Cookies from 'js-cookie'
import { refreshToken, accessToken } from '../../utils/token'
import { createSlice } from '@reduxjs/toolkit'
import { createAsyncAction } from '../../utils/request'

export const fetchForgotPassword = createAsyncAction({
  prefix: 'user/password-forgot',
  route: 'password-reset',
  method: 'POST',
})
export const fetchResetPassword = createAsyncAction({
  prefix: 'user/password-reset',
  route: 'password-reset/reset',
  method: 'POST',
})
export const fetchRegister = createAsyncAction({
  prefix: 'user/register',
  route: 'auth/register',
  method: 'POST',
})
export const fetchLogin = createAsyncAction({
  prefix: 'user/login',
  route: 'auth/login',
  method: 'POST',
})
export const fetchUserData = createAsyncAction({
  prefix: 'user/user-data',
  route: 'auth/user',
})
export const fetchCheckRefreshToken = createAsyncAction({
  prefix: 'user/check-refresh-token',
  route: 'auth/token',
  method: 'POST',
})
export const fetchUpdateUserData = createAsyncAction({
  prefix: 'user/udpate-user-data',
  route: 'auth/user',
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isAuthenticated: false,
    passwordForgot: {
      data: null,
      loading: false,
      error: false,
    },
    passwordReset: {
      data: null,
      loading: false,
      error: false,
    },
    register: {
      data: null,
      loading: false,
      error: false,
    },
    login: {
      data: null,
      loading: false,
      error: false,
    },
    userData: {
      data: null,
      loading: false,
      error: false,
    },
    checkRefreshToken: {
      data: null,
      loading: false,
      error: false,
    },
    updateUserData: {
      data: null,
      loading: false,
      error: false,
    },
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      Cookies.remove(refreshToken)
      Cookies.remove(accessToken)
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchForgotPassword.pending, (state) => {
        state.passwordForgot = { data: null, loading: true, error: false }
      })
      .addCase(fetchForgotPassword.fulfilled, (state, action) => {
        const response = action.payload
        state.passwordForgot = {
          ...state.passwordForgot,
          data: response ? action.payload : 'Some troubles',
          loading: false,
        }
        if (response) {
          localStorage.setItem('from', 'forgotPassword')
        }
      })
      .addCase(fetchForgotPassword.rejected, (state, action) => {
        state.passwordForgot = {
          ...state.passwordForgot,
          error: action.error.message,
          loading: false,
        }
      })

      .addCase(fetchResetPassword.pending, (state) => {
        state.passwordReset = { data: null, loading: true, error: false }
      })
      .addCase(fetchResetPassword.fulfilled, (state, action) => {
        const response = action.payload
        state.passwordReset = {
          ...state.passwordReset,
          data: response ? action.payload : 'Some troubles',
          loading: false,
        }
      })
      .addCase(fetchResetPassword.rejected, (state, action) => {
        state.passwordReset = {
          ...state.passwordReset,
          error: action.error.message,
          loading: false,
        }
      })

      .addCase(fetchRegister.pending, (state) => {
        state.register = { data: null, loading: true, error: false }
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        const response = action.payload
        state.register = {
          ...state.register,
          data: response ? action.payload : 'Пользователь уже существует',
          loading: false,
        }

        if (response) {
          Cookies.set(refreshToken, action.payload.refreshToken, {
            expires: 1,
          })
          Cookies.set(accessToken, action.payload.accessToken.split(' ')[1], {
            expires: 1,
          })
          state.isAuthenticated = true
          state.user = action.payload.user
        }
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.register = {
          ...state.register,
          error: action.error.message,
          loading: false,
        }
      })

      .addCase(fetchLogin.pending, (state) => {
        state.login = { data: null, loading: true, error: false }
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.login = {
          ...state.login,
          data: action.payload,
          loading: false,
        }
        state.isAuthenticated = true
        state.user = action.payload.user

        Cookies.set(refreshToken, action.payload.refreshToken, {
          expires: 1,
        })
        Cookies.set(accessToken, action.payload.accessToken.split(' ')[1], {
          expires: 1,
        })
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.login = {
          ...state.login,
          error: action.error.message,
          loading: false,
        }
      })

      .addCase(fetchUserData.pending, (state) => {
        state.userData = { data: null, loading: true, error: false }
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = {
          ...state.userData,
          data: action.payload.user,
          loading: false,
        }
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.userData = {
          ...state.userData,
          error: action.error.message,
          loading: false,
        }
      })

      .addCase(fetchCheckRefreshToken.pending, (state) => {
        state.checkRefreshToken = { data: null, loading: true, error: false }
      })
      .addCase(fetchCheckRefreshToken.fulfilled, (state, action) => {
        state.checkRefreshToken = {
          ...state.checkRefreshToken,
          data: action.payload,
          loading: false,
        }
        state.isAuthenticated = true

        Cookies.set(refreshToken, action.payload.refreshToken, {
          expires: 1,
        })
        Cookies.set(accessToken, action.payload.accessToken.split(' ')[1], {
          expires: 1,
        })
      })
      .addCase(fetchCheckRefreshToken.rejected, (state, action) => {
        state.checkRefreshToken = {
          ...state.checkRefreshToken,
          error: action.error.message,
          loading: false,
        }
      })

      .addCase(fetchUpdateUserData.pending, (state) => {
        state.updateUserData = { data: null, loading: true, error: false }
      })
      .addCase(fetchUpdateUserData.fulfilled, (state, action) => {
        state.updateUserData = {
          ...state.updateUserData,
          data: action.payload,
          loading: false,
        }
      })
      .addCase(fetchUpdateUserData.rejected, (state, action) => {
        state.updateUserData = {
          ...state.updateUserData,
          error: action.error.message,
          loading: false,
        }
      })
  },
})

export const { logout } = userSlice.actions
export default userSlice.reducer
