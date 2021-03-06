import { API_URL } from "../../../constants/index";
import { axiosApi } from "../../auth/interceptor";
import { schoolEditObj } from "../store/types";
export async function getAllTrainingSchools() {
  return axiosApi.get(`${API_URL}/api/v1/trainingSchools/`)
}

export function getTrainingSchool(id:string) {
  return axiosApi.get(`${API_URL}/api/v1/trainingSchools/${id}`)
}

export function createTrainingSchool(data) {
  return axiosApi.post(`${API_URL}/api/v1/trainingSchools/`,data)
}

export function editTrainingSchool(data,id:string) {
  return axiosApi.patch(`${API_URL}/api/v1/trainingSchools/${id}`,data)
}

export function deleteTrainingSchool(id:string) {
  return axiosApi.delete(`${API_URL}/api/v1/trainingSchools/${id}`)
}
