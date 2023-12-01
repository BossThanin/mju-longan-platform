import {get, post, remove} from "./ApiComponent";

const path = 'farmers';
export const getFarmerData = (filter) => {
  return get(`/${path}?search=${filter}`);
}

export const getFarmerDetail = (id) => {
  return get(`/${path}/${id}`)
}

export const updateFarmer = (data) => {
  console.log('data >>>>> ', data)
  let formData = new FormData();
  for(let key in data) {
    if(data[key] != null && data[key] !== '') {
      formData.append(key, data[key]);
    }
  }

  return post(`/${path}/${data.id}/update`, formData);
}

export const deleteFarmerById = (id) => {
  return remove(`/${path}/${id}`);
}

export const checkMaxPackage = (farmer_id) => {
  return get(`/${path}/${farmer_id}/check_max_package`)
}
