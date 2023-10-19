import { createSlice } from '@reduxjs/toolkit'
import { apiKey, giphyApiKey, giphyPath } from '../../constants/url'
import { createAsyncAction } from '../../utils/request'
import {
  RANDOM_SELECT_FIELD,
  TREND_SELECT_FIELD,
  SEARCH_SELECT_FIELD,
} from '../../constants/selectField'

export const randomGiphyFetch = createAsyncAction({
  prefix: 'giphy/random',
  path: `${giphyPath}/random?${giphyApiKey}&tag=&limit=1&rating=r`,
  method: 'GET',
})

export const trendGiphyFetch = createAsyncAction({
  prefix: 'giphy/trend',
  path: `${giphyPath}/trending?${giphyApiKey}&limit=1&offset=0&rating=g&bundle=messaging_non_clips`,
  method: 'GET',
})

export const giphySlice = createSlice({
  name: 'giphy',
  initialState: {
    fetchedGif: null,
    status: {
      isLoading: false,
      isRejected: false,
      response: null,
    },
  },
  reducers: {
    searchGiphy: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(randomGiphyFetch.pending, (state) => {
        state.status = {
          isLoading: true,
          isRejected: false,
          response: null,
        }
      })
      .addCase(randomGiphyFetch.rejected, (state) => {
        state.status = {
          isLoading: false,
          isRejected: true,
          response: null,
        }
      })
      .addCase(randomGiphyFetch.fulfilled, (state, action) => {
        state.fetchedGif = action.payload.data.images.original
        state.status = {
          isLoading: false,
          isRejected: false,
          response: action.payload,
        }
      })
      .addCase(trendGiphyFetch.pending, (state) => {
        state.status = {
          isLoading: true,
          isRejected: false,
          response: null,
        }
      })
      .addCase(trendGiphyFetch.rejected, (state) => {
        state.status = {
          isLoading: false,
          isRejected: true,
          response: null,
        }
      })
      .addCase(trendGiphyFetch.fulfilled, (state, action) => {
        state.fetchedGif = action.payload.data.images.original
        state.status = {
          isLoading: false,
          isRejected: false,
          response: action.payload,
        }
      })
  },
})

export const { searchGiphy } = giphySlice.actions
export default giphySlice.reducer
