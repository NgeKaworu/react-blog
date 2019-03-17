import request from "../../../utils/request";

const api = `/api/tags/v1/`;

export const fetchTags = ({ page }) => request(`${api}${page}`);
