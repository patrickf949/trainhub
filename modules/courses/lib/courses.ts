

import { API_URL } from "../../../constants/index";
import { axiosApi } from "../../auth/interceptor";

export function getAllCourses() {
  return axiosApi.get(`${API_URL}/api/v1/courses/`)
}

export function getCourse(id:string) {
  return axiosApi.get(`${API_URL}/api/v1/courses/${id}`)
}

export function createCourse(data) {
  return axiosApi.post(`${API_URL}/api/v1/courses/`,data)
}
export function editCourse(data,id:string) {
  return axiosApi.patch(`${API_URL}/api/v1/courses/${id}`,data)
}

export function deleteCourse(id:string) {
  return axiosApi.delete(`${API_URL}/api/v1/courses/${id}`)
}
