import Api from "./Api";

const path = '/longans';
export const createLongan = (data, longan_id = null) => {
  let formData = new FormData();
  for(let key in data){
    if(key === 'pictures') {
      data[key].map((pic, index) => {
        console.log('pic >>>>>>>> ', pic.id)
        if(pic.file && typeof pic.file === 'object') {
          if(pic.id) {
            formData.append(`pictures[${index}][id]`, pic.id)
          }
          formData.append(`pictures[${index}][directions]`, pic.directions)
          formData.append(`pictures[${index}][seq]`, pic.seq)
          formData.append(`pictures[${index}][file]`, pic.file)
        }
      })
    }else if(key === 'removesId'){
      data[key].map((id, idx) => {
        if(id) {
          formData.append(`removesId[${idx}]`, id)
        }
      })
    } else {
      formData.append(key, data[key]);
    }
  }

  if(longan_id) {
    return Api.post(`longans/${longan_id}/update`, formData)
  }else {
    return Api.post(path, formData);
  }
}

export const getLonganDetail = (id) => {
  return Api.get(`${path}/${id}`)
}

export const getLonganList = (farm_id = '', filter) => {
  console.log('filter >>> ', filter)
  let urlSearchStr = new URLSearchParams();
  urlSearchStr.append('farm_id', farm_id)
  Object.keys(filter).map((key) => {
    urlSearchStr.append(key, filter[key]);
  })
  return Api.get(`${path}?${urlSearchStr}`)
}
