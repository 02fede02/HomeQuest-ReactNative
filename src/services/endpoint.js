import axios from "axios";

export const endpoint = axios.create({
  baseURL: 'http://10.0.2.2:8080/api'
})