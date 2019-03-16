import request from "../utils/request";

export const fetch = page => {
  return request(`/api/article/v1/${page}`);
};
