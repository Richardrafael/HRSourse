import axios from "axios";

 export const api = axios.create (({
    baseURL : "https://viacep.com.br/ws/"
}))

export const postar = axios.create({
    baseURL: "http://localhost:3000/",
  });
export default api
