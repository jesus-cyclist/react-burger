const path = 'https://norma.nomoreparties.space/api/'

export const request = ({ routing, action, method = 'GET', data = null }) => {
  return function (dispatch) {
    const { request, success, failed } = action

    dispatch({
      type: request,
    })

    const requestOptions = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body:
        method === 'POST' && data
          ? JSON.stringify({ ingredients: data })
          : null,
    }
    const url = `${path}${routing}`

    fetch(url, requestOptions)
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response)
      )
      .then((response) =>
        dispatch({
          type: success,
          items: response,
        })
      )
      .catch((error) =>
        dispatch({
          type: failed,
        })
      )
  }
}
