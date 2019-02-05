import request from "../utils/request";

export const login = values => {
  return request("/api/login", {
    method: "POST",
    body: JSON.stringify(values)
  });
};

export const logout = values => {
  return request(`/api/logout/${values}`);
};
