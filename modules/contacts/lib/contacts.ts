

import { API_URL } from "../../../constants/index";
import { axiosApi } from "../../auth/interceptor";

export function getAllContacts() {
  return axiosApi.get(`${API_URL}/api/v1/contacts/`)
}

export function getContact(id) {
  return axiosApi.get(`${API_URL}/api/v1/contacts/${id}`)
}

export function createContact(data) {

  return axiosApi.post(`${API_URL}/api/v1/contacts/`,{phoneNumber:data.phoneNumber})
}
