

import { API_URL } from "../../../constants/index";
import { axiosApi } from "../../auth/interceptor";
import { editContactObj } from "../store/types";

export function getAllContacts() {
  return axiosApi.get(`${API_URL}/api/v1/contacts/`)
}

export function getContact(id:string) {
  return axiosApi.get(`${API_URL}/api/v1/contacts/${id}`)
}

export function createContact(data:editContactObj) {

  return axiosApi.post(`${API_URL}/api/v1/contacts/`,data)
}

export function editContact(data,id:string) {
  return axiosApi.patch(`${API_URL}/api/v1/contacts/${id}`,data)
}

export function deleteContact(id:string) {
  return axiosApi.delete(`${API_URL}/api/v1/contacts/${id}`)
}

