
import axios from "axios";
import { API_URL } from "../../../constants/index";
export function getAllTrainingSchools() {
  return axios.get(`${API_URL}/api/v1/trainingSchools/`)
}

export function getTrainingSchool(id) {
  return axios.get(`${API_URL}/api/v1/trainingSchools/${id}`)
}
