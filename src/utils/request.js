const path = 'https://norma.nomoreparties.space/api/'

export const ingredientsApiRequest = (setState, setError) => {
  const url = `${path}ingredients`
  fetch(url)
    .then((response) => checkResponse(response))
    .then((response) => setState(response.data))
    .catch((error) => setError(error))
}

export const orderApiRequest = (list, setState, setError) => {
  const url = `${path}orders`
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ingredients: list,
    }),
  }

  fetch(url, requestOptions)
    .then((response) => checkResponse(response))
    .then((response) => setState(response))
    .catch((error) => setError(error))
}

function checkResponse(response) {
  return response.ok ? response.json() : Promise.reject(response)
}
