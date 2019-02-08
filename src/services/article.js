import request from "../utils/request";

const api = `/api/article/v1/`;

export const fetch = id => {
  return request(`${api}${id}`);
};

export const remove = id => {
  return request(`${api}${id}`, {
    method: "DELETE"
  });
};

export const update = (id, values) => {
  return request(`${api}${id}`, {
    method: "PUT",
    body: JSON.stringify(values)
  });
};

export const create = values => {
  return request(api, {
    method: "POST",
    body: JSON.stringify(values)
  });
};
