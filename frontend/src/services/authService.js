import api from './api'

const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  register: async (email, password, name) => {
    const response = await api.post('/auth/register', { email, password, name })
    return response.data
  },

  refresh: async () => {
    const response = await api.post('/auth/refresh')
    return response.data
  },
}

export default authService