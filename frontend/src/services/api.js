import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const fetchAllRecords = async (page = 0, size = 10, sortBy = "id", sortDir = "asc") => {
  const response = await api.get(`/api/records?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`);
  return response.data;
};

export const fetchRecordById = async (id) => {
  const response = await api.get(`/api/records/${id}`);
  return response.data;
};

export const fetchStats = async () => {
  const response = await api.get(`/api/records/stats`);
  return response.data;
};

export const createRecord = async (data) => {
  const response = await api.post(`/api/records`, data);
  return response.data;
};

export const updateRecord = async (id, data) => {
  const response = await api.put(`/api/records/${id}`, data);
  return response.data;
};

export const deleteRecord = async (id) => {
  const response = await api.delete(`/api/records/${id}`);
  return response.data;
};

export default api;