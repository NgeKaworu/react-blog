import request from '../../../utils/request';


export const fetch = (value) => {
  return request(`/api/job/v1/${value}`);
}
