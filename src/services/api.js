import axios from "axios";

const API = "https://6a2820594e1e783349a51de7.mockapi.io/api/v1/employees";

export const getEmployees = () => axios.get(API);

export const getEmployeeById = (id) => axios.get(`${API}/${id}`);

export const addEmployee = (data) => axios.post(API, data);

export const updateEmployee = (id, data) =>
  axios.put(`${API}/${id}`, data);

export const deleteEmployee = (id) =>
  axios.delete(`${API}/${id}`);