import Api from "./Api";

export const getFarmDetail = (id, filter) => {
  let urlSearchStr = new URLSearchParams();
  if(filter) {
    Object.keys(filter).map((key) => {
      urlSearchStr.append(key, filter[key]);
    })
  }

  return Api.get(`farms/${id}?${urlSearchStr}`);
}

export const getFarmList = (farmer_id = '') => {
  return Api.get(`farms?farmer_id=${farmer_id}`);
}

export const addFarm = (data) => {
  console.log('data >>>>>>>>>>>>>>>>>>> ', data)
  let formData = new FormData();
  for(let key in data) {
    if(key === 'polygons') {
      for(let keyPoly in data[key]) {
        formData.append(`${key}[${keyPoly}][lat]`, parseFloat(data[key][keyPoly].lat))
        formData.append(`${key}[${keyPoly}][lng]`, parseFloat(data[key][keyPoly].lng))
      }
    }else {
      formData.append(key, data[key])
    }
  }

  return Api.post('farms', formData);
}
