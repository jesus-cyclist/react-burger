import { createAsyncThunk } from '@reduxjs/toolkit'

const path = 'https://norma.nomoreparties.space/api/'

const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Error ${res.status}`)

const checkSuccess = (res) =>
  res && res.success ? res : Promise.reject(`Answer on success ${res}`)

export const createAsyncAction = ({ prefix, route }) => {
  return createAsyncThunk(`${prefix}`, async (requestOptions = null) => {
    const url = `${path}${route}`

    return fetch(url, requestOptions)
      .then(checkResponse)
      .then(checkSuccess)
      .catch((error) => console.log(error))
  })
}
