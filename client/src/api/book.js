import axios from "axios";
import { API_URL } from "../config";

export const updateBookLocationApi = (bookId, locationId) => axios.put(`${API_URL}/books/${bookId}/change-location`, { locationId })
export const deleteBookApi = (parentLocationId) => axios.delete(`${API_URL}/books/${parentLocationId}/delete`)
export const createBookApi = ({ title, locationId }) => axios.post(`${API_URL}/books`, { title, locationId })
