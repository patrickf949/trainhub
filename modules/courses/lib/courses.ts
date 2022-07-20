

import { API_URL } from "../../../constants/index";
import { axiosApi } from "../../auth/interceptor";

export function getAllCourses() {
  return axiosApi.get(`${API_URL}/api/v1/courses/`)
}

export function getCourse(id) {
  return axiosApi.get(`${API_URL}/api/v1/courses/${id}`)
}
