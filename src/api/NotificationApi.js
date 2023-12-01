import {get} from "./ApiComponent";

export const getNotificationList = (user_id = '') => {
  return get(`notifications?user_id=${user_id}`);
}

export const getNotificationDetail = (id) => {
  return get(`notifications/${id}`)
}

export const getCountNotification = () => {
  return get('count_notification')
}
