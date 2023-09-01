export const request = (url, state, setState) => {
  fetch(url)
    .then((response) =>
      response.ok ? response.json() : Promise.reject(response)
    )
    .then((response) => setState([...state, ...response.data]))
    .catch((error) => console.error(error))
}
