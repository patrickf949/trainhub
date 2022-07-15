
import axios from "axios";
import { API_URL } from "../../../constants/index";
export function getAllContacts() {
  return axios.get(`${API_URL}/api/v1/contacts/`)
}

export function getContact(id) {
  return axios.get(`${API_URL}/api/v1/contacts/${id}`)
}
