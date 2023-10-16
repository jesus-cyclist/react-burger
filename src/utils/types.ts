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

export type TRequestData = {
  token?: { accessToken: string }
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
