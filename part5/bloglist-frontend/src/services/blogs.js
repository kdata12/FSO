import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (userToken) => {
  token = `bearer ${userToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: token}
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const incrementLike = async (blog, blogID) => {
  const config = {
    headers: { Authorization: token}
  }
  const response = await axios.put(`${baseUrl}/${blogID}`, blog, config)
  return response.data
}

const deleteBlog = async (blogID) => {
  const config = {
    headers: { Authorization: token}
  }
  await axios.delete(`${baseUrl}/${blogID}`,config)
}

export default { getAll, create, setToken, incrementLike, deleteBlog }