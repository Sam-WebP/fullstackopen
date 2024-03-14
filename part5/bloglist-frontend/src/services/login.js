import axios from 'axios'
const baseUrl = '/api/login'

const loginUser = async (username, password) => {
  const response = await axios.post(baseUrl, { username, password })
  return response.data
}

export default { loginUser }