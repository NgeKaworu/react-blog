import request from "../utils/request";

export const fetch = ({ page }) => {
  return request(`/api/article/v1/${page}`);
};

export const fetchTag = ({ page, tag }) => {
  return request(`/api/tags/v1/${tag}/${page}`);
};
