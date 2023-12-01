import {get, post, remove} from "./ApiComponent";

export const login = (credential) => {
  return post('/login', credential);
}

export const registerUser = (data) => {
  console.log('data >>>>> ', data)
  let formData = new FormData();
  for(let key in data) {
    if(data[key] != null && data[key] !== '') {
      formData.append(key, data[key]);
    }
  }

  return post('/register', formData);
}

export const getUserProfile = () => {
  return get('/me');
}

export const logout = () => {
  return get('/logout');
}

export const getUserList = (data) => {
  let urlSearchStr = new URLSearchParams();
  Object.keys(data).map((key) => {
    urlSearchStr.append(key, data[key])
  })
  return get(`/users?${urlSearchStr}`);
}


export const deleteUserById = (id) => {
  return remove(`/users/${id}`);
}

export const getUserById = (id) => {
  return get(`users/${id}`)
}

export const approveUser = (data) => {
  return post(`users/${data.id}/approve`, data)
}
