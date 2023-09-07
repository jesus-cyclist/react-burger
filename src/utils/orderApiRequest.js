export const orderApiRequest = (list, setState, setError) => {
  const url = 'https://norma.nomoreparties.space/api/orders'
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
    .then((response) =>
      response.ok ? response.json() : Promise.reject(response)
    )
    .then((response) => setState(response))
    .catch((error) => setError(error))
}
