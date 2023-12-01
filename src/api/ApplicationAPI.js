import {get, post, remove} from './ApiComponent'


export const getAppLists = (data) => {
    // console.log('data >> ',data)
    return get(`get_apps?search=${data}`)
}

export const addApp = (data) => {
    console.log('data >>> '+ data)
    let formData = new FormData();
    for(let key in data) {
        if(data[key] != null && data[key] !== '') {
            formData.append(key, data[key]);
        }
    }
    return post('add-app',formData)
}

export const getAppDetail = (id) => {
    return get(`/get-app-detail/${id}`)
}

export const EditApp = (data) => {
    let formData = new FormData();
    for(let key in data) {
        if(data[key] != null && data[key] !== '') {
            formData.append(key, data[key]);
        }
    }
    console.log('DATA')
    console.log(data)
    return post(`/edit_app/${data.id}`,formData)
}


export const showApp = (id,data) => {
    let formData = new FormData();
    for(let key in data) {
        if(data[key] != null && data[key] !== '') {
            formData.append(key, data[key]);
        }
    }
    return post(`/status/${id}`,formData)
}

export const deleteApp = (id) => {
    return remove(`/delete_app/${id}`)
}

export const getRef = () => {
    return get('token')
}