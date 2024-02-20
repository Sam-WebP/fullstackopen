import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

const getAll = () => {
  const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (name, newObject) => {
  const request = axios.put(`${baseUrl}/${name}`, newObject)
  return request.then(response => response.data)
}

const deleteRecord = name => {
  const request = axios.delete(`${baseUrl}/${name}`)
  return request.then(response => response.data)
}

export default { getAll, create, update, deleteRecord }