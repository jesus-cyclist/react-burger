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
  count?: number
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

export type TRequestData = {
  token?: any
  body?: any
}

export type TRequestOptions = TRequestData & {
  method: string
  headers: {
    'Content-Type': string
    Authorization?: string
  }
}

export type TCheckResponse = (response: Response) => Promise<any>
export type TCheckSuccess = (response: Response) => Response | Promise<any>

export type TCreateAsyncAction = {
  prefix: string
  route: string
  method: string
}

export type TIngredientId = string

export type TIngredients = Array<TIngredientId>

export type TOrder = {
  ingredients: TIngredients
  _id: string
  status: string
  name: string
  number: number
  createdAt: string
  updatedAt: string
}

export type TOrders = {
  success: boolean
  orders: Array<TOrder>
  total: number
  totalToday: number
}

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export type TScrollData = {
  bunDistance: number
  sauceDistance: number
  mainDistance: number
}
