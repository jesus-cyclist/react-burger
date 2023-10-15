import { PASSWORD, NAME, EMAIL } from '../constants/inputType/inputType'

export type TIngredient = {
  calories: number
  carbohydrates: number
  fat: number
  image: string
  image_large: string
  image_mobile: string
  name: string
  price: number
  proteins: number
  type: string
  __v: number
  _id: string
  key?: string
}

export type TLocation = {
  hash: string
  key: string
  pathname: string
  search: string
  state: { [key: string]: TLocation } | null
}

export type TActiveTab = {
  activeTab: string
}

export type TInputType = 'password' | 'email' | 'text' | undefined

export type TUserData = {
  password: string
  name: string
  email: string
}
