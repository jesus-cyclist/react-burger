import { createAction } from '@reduxjs/toolkit'
import { TScrollData } from '../../utils/types'

export const makeBunActive = createAction('MAKE_BUN_ACTIVE')
export const makeSauceActive = createAction('MAKE_SAUCE_ACTIVE')
export const makeMainActive = createAction('MAKE_MAIN_ACTIVE')
export const makeScroll = createAction<TScrollData | undefined, 'SCROLL'>(
  'SCROLL'
)
