import Api from "./Api";

export const get = (path) => {
  return Api.get(path).then(res => {
    return res;
  })
}

export const post = (path, data) => {
  return Api.post(path, data).then(res => {
    return res;
  })
}

export const put = (path, data) => {
  return Api.put(path, data).then(res => {
    return res;
  })
}

export const remove = (path) => {
  return Api.delete(path).then(res => {
    return res;
  })
}
