import { message } from "antd";
export default props => {
  const token = localStorage.getItem("token");
  if (token) return props.children;
  message.info("请先登录");
  props.history.push("/login");
  return null;
};
