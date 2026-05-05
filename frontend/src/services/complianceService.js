import api from './api'

const complianceService = {
  getAll: async (params = {}) => {
    const response = await api.get('/api/compliance', { params })
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/api/compliance/${id}`)
    return response.data
  },

  create: async (data) => {
    const response = await api.post('/api/compliance', data)
    return response.data
  },

  update: async (id, data) => {
    const response = await api.put(`/api/compliance/${id}`, data)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/api/compliance/${id}`)
    return response.data
  },

  search: async (query, params = {}) => {
    const response = await api.get('/api/compliance/search', { params: { q: query, ...params } })
    return response.data
  },

  getStats: async () => {
    const response = await api.get('/api/compliance/stats')
    return response.data
  },

  exportCsv: async () => {
    const response = await api.get('/api/compliance/export', { responseType: 'blob' })
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'compliance-records.csv')
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  },
}

export default complianceService