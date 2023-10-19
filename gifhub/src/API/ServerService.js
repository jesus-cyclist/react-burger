import axios from 'axios'
import { serverUrl } from '../constants/url'

export default class serverService {
  static async addGIif(gif, userId, collectionId) {
    if (!gif || !userId || !collectionId) {
      console.log('не хватает аргументов')
      return
    }
    //  const url = `${serverUrl}/api/users/:${userId}/collections/:${collectionId}/images`

    //  console.log(url)
    const response = await axios.post(
      `${serverUrl}/echo`,
      {
        gif,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    return response
  }
}
