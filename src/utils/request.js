import fetch from "dva/fetch";
import { message } from "antd";
function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  const status = response.status;
  const status_code = {
    201: "创建成功",
    202: "修改成功",
    401: "权限不足",
    403: "请重新登录",
    404: "页面未找到"
  };
  if (status_code[status]) {
    message.info(status_code[status]);
  }

  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;

  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}
