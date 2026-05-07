import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const fetchAllRecords = async (page = 0, size = 10, sortBy = "id", sortDir = "asc", search = "", status = "", startDate = "", endDate = "") => {
  const params = new URLSearchParams({
    page, size, sortBy, sortDir,
    ...(search && { search }),
    ...(status && { status }),
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
  });
  const response = await api.get(`/api/records?${params}`);
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

export const exportCSV = async () => {
  const response = await api.get(`/api/records/export`, {
    responseType: "blob",
  });
  return response.data;
};

export const askAI = async (question, recordId = null) => {
  const response = await axios.post(
    `${import.meta.env.VITE_AI_URL}/query`,
    { question, record_id: recordId }
  );
  return response.data;
};

export const getAIRecommendations = async (data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_AI_URL}/recommend`,
    data
  );
  return response.data;
};

export default api;