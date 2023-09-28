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
  CHECK_REFRESH_TOKEN_FAILED,
  CHECK_REFRESH_TOKEN_REQUEST,
  CHECK_REFRESH_TOKEN_SUCCESS,
} from '../actions/userData'
import Cookies from 'js-cookie'
import { refreshToken, accessToken } from '../../utils/token'

const initialState = {
  user: null,
  isAuthenticated: false,
  passwordForgot: {
    request: false,
    failed: false,
    success: false,
    response: '',
  },
  passwordReset: {
    request: false,
    failed: false,
    success: false,
    response: '',
  },
  register: {
    request: false,
    failed: false,
    success: false,
    response: '',
  },
  login: {
    request: false,
    failed: false,
    success: false,
    response: '',
  },
  userData: {
    request: false,
    failed: false,
    success: false,
    response: '',
  },
  checkRefreshToken: {
    request: false,
    failed: false,
    success: false,
    response: '',
  },
}

export const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        passwordForgot: {
          ...state.passwordForgot,
          request: true,
          failed: false,
          success: false,
          response: '',
        },
      }
    }
    case GET_FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        passwordForgot: {
          ...state.passwordForgot,
          request: false,
          failed: true,
        },
      }
    }
    case GET_FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        passwordForgot: {
          ...state.passwordForgot,
          request: false,
          success: true,
          response: action.payload,
        },
      }
    }

    case GET_RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        passwordReset: {
          ...state.passwordReset,
          request: true,
          failed: false,
          success: false,
          response: '',
        },
      }
    }
    case GET_RESET_PASSWORD_FAILED: {
      return {
        ...state,
        passwordReset: {
          ...state.passwordReset,
          request: false,
          failed: true,
        },
      }
    }

    case GET_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        passwordReset: {
          ...state.passwordReset,
          request: false,
          success: true,
          response: action.payload,
        },
      }
    }

    case GET_REGISTER_USER_REQUEST: {
      return {
        ...state,
        register: {
          ...state.register,
          request: true,
          failed: false,
          success: false,
          response: '',
        },
      }
    }
    case GET_REGISTER_USER_FAILED: {
      return {
        ...state,
        register: {
          ...state.register,
          request: false,
          failed: true,
        },
      }
    }
    case GET_REGISTER_USER_SUCCESS: {
      return {
        ...state,
        register: {
          ...state.register,
          request: false,
          success: true,
          response: action.payload,
        },
      }
    }

    case GET_LOGIN_USER_REQUEST: {
      return {
        ...state,
        login: {
          ...state.login,
          request: true,
          failed: false,
          success: false,
          response: '',
        },
      }
    }
    case GET_LOGIN_USER_FAILED: {
      return {
        ...state,
        login: {
          ...state.login,
          request: false,
          failed: true,
        },
      }
    }
    case GET_LOGIN_USER_SUCCESS: {
      Cookies.set(refreshToken, action.payload.refreshToken, {
        expires: 1,
      })
      Cookies.set(accessToken, action.payload.accessToken.split(' ')[1], {
        expires: 1,
      })
      // console.log(
      //   'refreshToken =     ',
      //   Cookies.get(refreshToken),
      //   'accessToken =    ',
      //   Cookies.get(accessToken)
      // )
      return {
        ...state,
        login: {
          ...state.login,
          request: false,
          success: true,
          response: action.payload,
        },
        isAuthenticated: true,
        user: action.payload.user,
      }
    }
    case LOGOUT_USER: {
      Cookies.remove(refreshToken)
      Cookies.remove(accessToken)
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    }

    case GET_USER_DATA_REQUEST: {
      return {
        ...state,
        userData: {
          ...state.userData,
          request: true,
          failed: false,
          success: false,
          response: '',
        },
      }
    }
    case GET_USER_DATA_FAILED: {
      return {
        ...state,
        userData: {
          ...state.userData,
          request: false,
          failed: true,
        },
      }
    }
    case GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        userData: {
          ...state.userData,
          request: false,
          success: true,
          response: action.payload.user,
        },
      }
    }

    case CHECK_REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        checkRefreshToken: {
          ...state.checkRefreshToken,
          request: true,
          failed: false,
          success: false,
          response: '',
        },
      }
    }

    case CHECK_REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        checkRefreshToken: {
          ...state.checkRefreshToken,
          request: false,
          failed: true,
        },
      }
    }
    case CHECK_REFRESH_TOKEN_SUCCESS: {
      Cookies.set(refreshToken, action.payload.refreshToken, {
        expires: 1,
      })
      Cookies.set(accessToken, action.payload.accessToken.split(' ')[1], {
        expires: 1,
      })

      return {
        ...state,
        checkRefreshToken: {
          ...state.checkRefreshToken,
          request: false,
          success: true,
          response: action.payload,
        },
        isAuthenticated: true,
      }
    }

    default:
      return state
  }
}
