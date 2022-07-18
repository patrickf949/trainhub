import { API_URL } from "../../../constants/index";
import { axiosApi } from "../../auth/interceptor";
import { schoolEditObj } from "../store/types";
export async function getAllTrainingSchools() {
  return axiosApi.get(`${API_URL}/api/v1/trainingSchools/`)
}

export function getTrainingSchool(id:string) {
  return axiosApi.get(`${API_URL}/api/v1/trainingSchools/${id}`)
}

export function createTrainingSchool(data:schoolEditObj) {
  return axiosApi.post(`${API_URL}/api/v1/trainingSchools/`,data)
}

export function editTrainingSchool(data:schoolEditObj) {
  return axiosApi.patch(`${API_URL}/api/v1/trainingSchools/`,data)
}
