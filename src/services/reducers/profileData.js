import {
  LOGOUT_USER,
  GET_FORGOT_PASSWORD_REQUEST,
  GET_FORGOT_PASSWORD_FAILED,
  GET_FORGOT_PASSWORD_SUCCESS,
  GET_RESET_PASSWORD_FAILED,
  GET_RESET_PASSWORD_REQUEST,
  GET_RESET_PASSWORD_SUCCESS,
  GET_REGISTER_USER_FAILED,
  GET_REGISTER_USER_REQUEST,
  GET_REGISTER_USER_SUCCESS,
  GET_LOGIN_USER_FAILED,
  GET_LOGIN_USER_REQUEST,
  GET_LOGIN_USER_SUCCESS,
  GET_USER_DATA_FAILED,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  UPDATE_USER_DATA_FAILED,
  UPDATE_USER_DATA_REQUEST,
  UPDATE_USER_DATA_SUCCESS,
} from '../actions/profileData'
import Cookies from 'js-cookie'
import { refreshCookie } from '../../utils/token'

const initialState = {
  user: null,
  userData: null,
  isAuthenticated: false,
  passwordForgotRequest: false,
  passwordForgotFailed: false,
  passwordForgotSuccess: false,
  passwordForgotReponse: '',
  passwordResetRequest: false,
  passwordResetFailed: false,
  passwordResetSuccess: false,
  passwordResetReponse: '',
  registerRequest: false,
  registerFailed: false,
  registerSuccess: false,
  registerReponse: '',
  loginRequest: false,
  loginFailed: false,
  loginSuccess: false,
  loginReponse: '',
  userDataRequest: false,
  userDataFailed: false,
  userDataSuccess: false,
  userDataReponse: '',
}

export const profileDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        passwordForgotRequest: true,
        passwordForgotFailed: false,
        passwordForgotSuccess: false,
        passwordForgotReponse: '',
      }
    }
    case GET_FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        passwordForgotRequest: false,
        passwordForgotFailed: true,
      }
    }
    case GET_FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        passwordForgotRequest: false,
        passwordForgotSuccess: true,
        passwordForgotReponse: action.items,
      }
    }
    case GET_RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        passwordResetRequest: true,
        passwordResetFailed: false,
        passwordResetSuccess: false,
        passwordResetReponse: '',
      }
    }
    case GET_RESET_PASSWORD_FAILED: {
      return {
        ...state,
        passwordResetRequest: false,
        passwordResetFailed: true,
      }
    }
    case GET_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        passwordResetRequest: false,
        passwordResetSuccess: true,
        passwordResetReponse: action.items,
      }
    }
    case GET_REGISTER_USER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
        registerFailed: false,
        registerSuccess: false,
        registerReponse: '',
      }
    }
    case GET_REGISTER_USER_FAILED: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: true,
      }
    }
    case GET_REGISTER_USER_SUCCESS: {
      console.log(action)
      return {
        ...state,
        registerRequest: false,
        registerSuccess: true,
        registerReponse: action.items,
      }
    }
    case GET_LOGIN_USER_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
        loginSuccess: false,
        loginReponse: '',
      }
    }
    case GET_LOGIN_USER_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true,
      }
    }
    case GET_LOGIN_USER_SUCCESS: {
      Cookies.set(refreshCookie, action.items.refreshToken)
      console.log(Cookies.get(refreshCookie))
      return {
        ...state,
        loginRequest: false,
        loginSuccess: true,
        loginReponse: action.items,
        user: action.items.user,
        isAuthenticated: true,
      }
    }

    case LOGOUT_USER: {
      Cookies.remove(refreshCookie)
      console.log(Cookies.get(refreshCookie))
      return { ...state, isAuthenticated: false, user: null }
    }

    case GET_USER_DATA_REQUEST: {
      return {
        ...state,
        userDataRequest: true,
        userDataFailed: false,
        userDataSuccess: false,
        userDataReponse: '',
      }
    }
    case GET_USER_DATA_FAILED: {
      return {
        ...state,
        userDataRequest: false,
        userDataFailed: true,
      }
    }
    case GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        userDataRequest: false,
        userDataSuccess: true,
        userDataReponse: action.items,
      }
    }

    default:
      return state
  }
}
