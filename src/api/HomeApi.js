import Api from "./Api";

export const getHomeData = () => {
  return Api.get('home');
}
