import { API_URL } from "../constants/index";
import { axiosApi } from "../modules/auth/interceptor";

export function getDistricts() {
    return axiosApi.get(`${API_URL}/api/v1/districts`)
  }
  