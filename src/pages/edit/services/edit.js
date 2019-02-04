import request from "../../../utils/request";

const api = `/api/article/v1/`;

export const fetch = value => {
  return request(`${api}${value}`);
};

export const remove = value => {
  return request(`${api}${value}`, {
    method: "DELETE"
  });
};

export const put = value => {
  return request(`${api}${value}`, {
    method: "PUT",
    body: JSON.stringify(value)
  });
};

export const create = value => {
  return request(api, {
    method: "POST",
    body: JSON.stringify(value)
  });
};
