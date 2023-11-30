import userReducer, {
  fetchCheckRefreshToken,
  fetchForgotPassword,
  fetchLogin,
  fetchRegister,
  fetchResetPassword,
  fetchUpdateUserData,
  fetchUserData,
} from './user'

const initialState = {
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
}

global.fetch = jest.fn()

describe('test user', () => {
  it('should return initial value', () => {
    expect(userReducer(undefined, { type: 'any action' })).toEqual(initialState)
  })

  it('shoul make fetch to forgot password with resolve value', async () => {
    const forgotPasswordData = {
      success: true,
      data: [],
    }

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(forgotPasswordData),
    })

    const dispatch = jest.fn()
    const thunk = fetchForgotPassword()
    await thunk(dispatch)

    expect(dispatch.mock.calls).toHaveLength(2)

    const [start, end] = dispatch.mock.calls

    expect(start[0].type).toEqual(fetchForgotPassword.pending().type)
    expect(end[0].type).toEqual(fetchForgotPassword.fulfilled().type)
  })

  it('shoul make fetch to forgot password with rejected value', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 500,
    })

    const dispatch = jest.fn()
    const thunk = fetchForgotPassword()
    await thunk(dispatch).catch((error) => expect(error).toEqual('Error 500'))
    expect(dispatch.mock.calls).toHaveLength(2)
  })

  it('shoul make fetch to reset password with resolve value', async () => {
    const resetPasswordData = {
      success: true,
      data: [],
    }

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(resetPasswordData),
    })

    const dispatch = jest.fn()
    const thunk = fetchResetPassword()
    await thunk(dispatch)

    expect(dispatch.mock.calls).toHaveLength(2)

    const [start, end] = dispatch.mock.calls

    expect(start[0].type).toEqual(fetchResetPassword.pending().type)
    expect(end[0].type).toEqual(fetchResetPassword.fulfilled().type)
  })

  it('shoul make fetch to reset password with rejected value', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 500,
    })

    const dispatch = jest.fn()
    const thunk = fetchResetPassword()
    await thunk(dispatch).catch((error) => expect(error).toEqual('Error 500'))
    expect(dispatch.mock.calls).toHaveLength(2)
  })

  it('shoul make fetch to register with resolve value', async () => {
    const registerPasswordData = {
      success: true,
      data: [],
    }

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(registerPasswordData),
    })

    const dispatch = jest.fn()
    const thunk = fetchRegister()
    await thunk(dispatch)

    expect(dispatch.mock.calls).toHaveLength(2)

    const [start, end] = dispatch.mock.calls

    expect(start[0].type).toEqual(fetchRegister.pending().type)
    expect(end[0].type).toEqual(fetchRegister.fulfilled().type)
  })

  it('shoul make fetch to register with rejected value', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 500,
    })

    const dispatch = jest.fn()
    const thunk = fetchRegister()
    await thunk(dispatch).catch((error) => expect(error).toEqual('Error 500'))
    expect(dispatch.mock.calls).toHaveLength(2)
  })

  it('shoul make fetch to login with resolve value', async () => {
    const loginData = {
      success: true,
      data: [],
    }

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(loginData),
    })

    const dispatch = jest.fn()
    const thunk = fetchLogin()
    await thunk(dispatch)

    expect(dispatch.mock.calls).toHaveLength(2)

    const [start, end] = dispatch.mock.calls

    expect(start[0].type).toEqual(fetchLogin.pending().type)
    expect(end[0].type).toEqual(fetchLogin.fulfilled().type)
  })

  it('shoul make fetch to login with rejected value', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 500,
    })

    const dispatch = jest.fn()
    const thunk = fetchLogin()
    await thunk(dispatch).catch((error) => expect(error).toEqual('Error 500'))
    expect(dispatch.mock.calls).toHaveLength(2)
  })

  it('shoul make fetch to user data with resolve value', async () => {
    const userData = {
      success: true,
      data: [],
    }

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(userData),
    })

    const dispatch = jest.fn()
    const thunk = fetchUserData()
    await thunk(dispatch)

    expect(dispatch.mock.calls).toHaveLength(2)

    const [start, end] = dispatch.mock.calls

    expect(start[0].type).toEqual(fetchUserData.pending().type)
    expect(end[0].type).toEqual(fetchUserData.fulfilled().type)
  })

  it('shoul make fetch to user data with rejected value', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 500,
    })

    const dispatch = jest.fn()
    const thunk = fetchUserData()
    await thunk(dispatch).catch((error) => expect(error).toEqual('Error 500'))
    expect(dispatch.mock.calls).toHaveLength(2)
  })

  it('shoul make fetch to refresh token with resolve value', async () => {
    const refreshTokenData = {
      success: true,
      data: [],
    }

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(refreshTokenData),
    })

    const dispatch = jest.fn()
    const thunk = fetchCheckRefreshToken()
    await thunk(dispatch)

    expect(dispatch.mock.calls).toHaveLength(2)

    const [start, end] = dispatch.mock.calls

    expect(start[0].type).toEqual(fetchCheckRefreshToken.pending().type)
    expect(end[0].type).toEqual(fetchCheckRefreshToken.fulfilled().type)
  })

  it('shoul make fetch to refresh token with rejected value', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 500,
    })

    const dispatch = jest.fn()
    const thunk = fetchCheckRefreshToken()
    await thunk(dispatch).catch((error) => expect(error).toEqual('Error 500'))
    expect(dispatch.mock.calls).toHaveLength(2)
  })

  it('shoul make fetch to update user data with resolve value', async () => {
    const updateUserData = {
      success: true,
      data: [],
    }

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(updateUserData),
    })

    const dispatch = jest.fn()
    const thunk = fetchUpdateUserData()
    await thunk(dispatch)

    expect(dispatch.mock.calls).toHaveLength(2)

    const [start, end] = dispatch.mock.calls

    expect(start[0].type).toEqual(fetchUpdateUserData.pending().type)
    expect(end[0].type).toEqual(fetchUpdateUserData.fulfilled().type)
  })

  it('shoul make fetch to update user data with rejected value', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 500,
    })

    const dispatch = jest.fn()
    const thunk = fetchUpdateUserData()
    await thunk(dispatch).catch((error) => expect(error).toEqual('Error 500'))
    expect(dispatch.mock.calls).toHaveLength(2)
  })

  it('should change status with fetchForgotPassword.pending action', () => {
    const state = userReducer(initialState, fetchForgotPassword.pending())
    expect({
      ...initialState,
      passwordForgot: { data: null, loading: true, error: false },
    }).toEqual(state)
  })

  it('should change status with fetchForgotPassword.fullfield action', () => {
    const payload = {}

    const stateWithPayload = userReducer(
      initialState,
      fetchForgotPassword.fulfilled(payload)
    )
    expect({
      ...initialState,
      passwordForgot: { data: {}, loading: false, error: false },
    }).toEqual(stateWithPayload)

    const stateWithoutPayload = userReducer(
      initialState,
      fetchForgotPassword.fulfilled()
    )

    expect({
      ...initialState,
      passwordForgot: { data: 'Some troubles', loading: false, error: false },
    }).toEqual(stateWithoutPayload)
  })

  it('should change status with fetchForgotPassword.rejected action', () => {
    const state = userReducer(initialState, fetchForgotPassword.rejected())
    expect({
      ...initialState,
      passwordForgot: { data: null, loading: false, error: true },
    }).toEqual(state)
  })

  it('should change status with fetchResetPassword.pending action', () => {
    const state = userReducer(initialState, fetchResetPassword.pending())
    expect({
      ...initialState,
      passwordReset: { data: null, loading: true, error: false },
    }).toEqual(state)
  })

  it('should change status with fetchResetPassword.fullfield action', () => {
    const payload = {}

    const stateWithPayload = userReducer(
      initialState,
      fetchResetPassword.fulfilled(payload)
    )
    expect({
      ...initialState,
      passwordReset: { data: {}, loading: false, error: false },
    }).toEqual(stateWithPayload)

    const stateWithoutPayload = userReducer(
      initialState,
      fetchResetPassword.fulfilled()
    )

    expect({
      ...initialState,
      passwordReset: { data: 'Some troubles', loading: false, error: false },
    }).toEqual(stateWithoutPayload)
  })

  it('should change status with fetchResetPassword.rejected action', () => {
    const state = userReducer(initialState, fetchResetPassword.rejected())
    expect({
      ...initialState,
      passwordReset: { data: null, loading: false, error: true },
    }).toEqual(state)
  })

  it('should change status with fetchRegister.pending action', () => {
    const state = userReducer(initialState, fetchRegister.pending())
    expect({
      ...initialState,
      register: { data: null, loading: true, error: false },
    }).toEqual(state)
  })

  it('should change status with fetchRegister.fullfield action', () => {
    const payload = {
      accessToken: 'abc',
      refreshToken: 'abc',
      user: {},
    }

    const stateWithPayload = userReducer(
      initialState,
      fetchRegister.fulfilled(payload)
    )

    expect({
      ...initialState,
      register: { data: { ...payload }, loading: false, error: false },
      isAuthenticated: true,
      user: {},
    }).toEqual(stateWithPayload)

    const stateWithoutPayload = userReducer(
      initialState,
      fetchRegister.fulfilled()
    )

    expect({
      ...initialState,
      register: {
        data: 'Пользователь уже существует',
        loading: false,
        error: false,
      },
    }).toEqual(stateWithoutPayload)
  })

  it('should change status with fetchRegister.rejected action', () => {
    const state = userReducer(initialState, fetchRegister.rejected())
    expect({
      ...initialState,
      register: { data: null, loading: false, error: true },
    }).toEqual(state)
  })

  it('should change status with fetchLogin.pending action', () => {
    const state = userReducer(initialState, fetchLogin.pending())
    expect({
      ...initialState,
      login: { data: null, loading: true, error: false },
    }).toEqual(state)
  })

  it('should change status with fetchLogin.fullfield action', () => {
    const payload = {
      accessToken: 'abc',
      refreshToken: 'abc',
      user: {},
    }

    const stateWithPayload = userReducer(
      initialState,
      fetchLogin.fulfilled(payload)
    )
    expect({
      ...initialState,
      login: { data: { ...payload }, loading: false, error: false },
      isAuthenticated: true,
      user: {},
    }).toEqual(stateWithPayload)
  })

  it('should change status with fetchLogin.rejected action', () => {
    const state = userReducer(initialState, fetchLogin.rejected())
    expect({
      ...initialState,
      login: { data: null, loading: false, error: true },
    }).toEqual(state)
  })

  it('should change status with fetchUserData.pending action', () => {
    const state = userReducer(initialState, fetchUserData.pending())
    expect({
      ...initialState,
      userData: { data: null, loading: true, error: false },
    }).toEqual(state)
  })

  it('should change status with fetchUserData.fullfield action', () => {
    const payload = { user: {} }

    const stateWithPayload = userReducer(
      initialState,
      fetchUserData.fulfilled(payload)
    )

    expect({
      ...initialState,
      userData: { data: {}, loading: false, error: false },
    }).toEqual(stateWithPayload)
  })

  it('should change status with fetchUserData.rejected action', () => {
    const state = userReducer(initialState, fetchUserData.rejected())
    expect({
      ...initialState,
      userData: { data: null, loading: false, error: true },
    }).toEqual(state)
  })

  it('should change status with fetchCheckRefreshToken.pending action', () => {
    const state = userReducer(initialState, fetchCheckRefreshToken.pending())
    expect({
      ...initialState,
      checkRefreshToken: { data: null, loading: true, error: false },
    }).toEqual(state)
  })

  it('should change status with fetchCheckRefreshToken.fullfield action', () => {
    const payload = { accessToken: 'abc', refreshToken: 'abc' }

    const stateWithPayload = userReducer(
      initialState,
      fetchCheckRefreshToken.fulfilled(payload)
    )
    expect({
      ...initialState,
      checkRefreshToken: { data: { ...payload }, loading: false, error: false },
      isAuthenticated: true,
    }).toEqual(stateWithPayload)
  })

  it('should change status with fetchCheckRefreshToken.rejected action', () => {
    const state = userReducer(initialState, fetchCheckRefreshToken.rejected())
    expect({
      ...initialState,
      checkRefreshToken: { data: null, loading: false, error: true },
    }).toEqual(state)
  })

  it('should change status with fetchUpdateUserData.pending action', () => {
    const state = userReducer(initialState, fetchUpdateUserData.pending())
    expect({
      ...initialState,
      updateUserData: { data: null, loading: true, error: false },
    }).toEqual(state)
  })

  it('should change status with fetchUpdateUserData.fullfield action', () => {
    const payload = {}

    const stateWithPayload = userReducer(
      initialState,
      fetchUpdateUserData.fulfilled(payload)
    )
    expect({
      ...initialState,
      updateUserData: { data: {}, loading: false, error: false },
    }).toEqual(stateWithPayload)
  })

  it('should change status with fetchUpdateUserData.rejected action', () => {
    const state = userReducer(initialState, fetchUpdateUserData.rejected())
    expect({
      ...initialState,
      updateUserData: { data: null, loading: false, error: true },
    }).toEqual(state)
  })
})
