import axios from "axios";
import { API_URL } from "../config";

export const getLocationPathApi = (locationId) => axios.get(`${API_URL}/locations/${locationId}/path`)
export const getLocationChildrenApi = (parentLocationId) => axios.get(`${API_URL}/locations/${parentLocationId}/children`)
export const deleteLocationApi = (parentLocationId) => axios.delete(`${API_URL}/locations/${parentLocationId}/delete`)
export const createLocationApi = ({ name, parentLocationId }) => axios.post(`${API_URL}/locations`, { name, parentLocationId })