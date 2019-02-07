import request from "../utils/request";

const api = `/api/article/v1/`;

export const fetch = values => {
  return request(`${api}${values}`);
};

export const remove = values => {
  return request(`${api}${values}`, {
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
