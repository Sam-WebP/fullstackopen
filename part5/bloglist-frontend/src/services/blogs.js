import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: `${token}` },
  }
  const request = axios.delete(`${ baseUrl }/${blog.id}`, config)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken, deleteBlog }