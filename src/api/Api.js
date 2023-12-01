import {create} from 'apisauce'
import {actionSetAppToken, actionSetUser} from "../redux/app";
import {store} from "../redux/store";

const Api = create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    Accept: 'application/json; charset=utf-8'
  }
})

export function setToken (token){
  Api.setHeader('Authorization', `Bearer ${token}`)
}

Api.axiosInstance.interceptors.response.use(response => response, (error) => {
  if(error.response && error.response.status == 401) {
    setToken('')
    store.dispatch(actionSetAppToken(null))
    store.dispatch(actionSetUser(null))
    return error.response
  }else {
    return error.response
  }
})

export default Api;
