import axios from "axios";
import { getToken } from "./store/changes";
let axiosApi = axios.create({
    headers: {
        // Authorization: 'this'
      Authorization :  getToken()
      }
});

export {axiosApi}