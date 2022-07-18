import { API_URL } from "../../../constants/index";
import { axiosApi } from "../../auth/interceptor";
export async function getAllTrainingSchools() {
  return axiosApi.get(`${API_URL}/api/v1/trainingSchools/`)
}

export function getTrainingSchool(id) {
  return axiosApi.get(`${API_URL}/api/v1/trainingSchools/${id}`)
}
