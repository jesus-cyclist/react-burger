export const request = (setState, setError) => {
  const url = 'https://norma.nomoreparties.space/api/ingredients'
  fetch(url)
    .then((response) =>
      response.ok ? response.json() : Promise.reject(response)
    )
    .then((response) => setState(response.data))
    .catch((error) => setError(error))
}
