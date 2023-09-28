const path = 'https://norma.nomoreparties.space/api/'

const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Error ${res.status}`)

const checkSuccess = (res) =>
  res && res.success ? res : Promise.reject(`Answer on success ${res}`)

export const request = ({ routing, action, data = null }) => {
  return function (dispatch) {
    const { request, success, failed } = action

    dispatch({
      type: request,
    })

    const url = `${path}${routing}`

    fetch(url, data)
      .then(checkResponse)
      .then(checkSuccess)
      .then((response) =>
        dispatch({
          type: success,
          payload: response,
        })
      )
      .catch((error) =>
        dispatch({
          type: failed,
        })
      )
  }
}
