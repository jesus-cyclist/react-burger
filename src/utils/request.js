import { createAsyncThunk } from '@reduxjs/toolkit'

const path = 'https://norma.nomoreparties.space/api/'

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error ${res.status}`)
}

const checkSuccess = (res) =>
  res && res.success ? res : Promise.reject(`Answer on success ${res}`)

export const createAsyncAction = ({ prefix, route, method = 'GET' }) => {
  return createAsyncThunk(`${prefix}`, async (requestData = null) => {
    return request(route, method, requestData)
  })
}

export const request = (route, method, requestData) => {
  const url = `${path}${route}`
  const requestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  }

  if (requestData?.token) {
    requestOptions.headers['Authorization'] =
      'Bearer ' + requestData.token.accessToken
  }

  if (requestData?.body) {
    requestOptions.body = JSON.stringify(requestData.body)
  }

  return fetch(url, requestOptions)
    .then(checkResponse)
    .then(checkSuccess)
    .catch((error) => console.log(error))
}
