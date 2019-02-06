import * as userService from "../services/user";
import { message } from "antd";

export default {
  namespace: "user",

  state: {
    token: "",
    uid: "",
    name: "",
    message: ""
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === "/logout") {
          dispatch({
            type: "logout"
          });
          history.push("/");
        }
      });
    }
  },

  effects: {
    *login(
      {
        payload: { values }
      },
      { call, put }
    ) {
      const { data } = yield call(userService.login, values);
      if (data && data.message === "succeed") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("uid", data.uid);
        localStorage.setItem("name", data.name);
        yield put({ type: "save", payload: data });
      } else {
        message.error("登陆失败");
      }
    },
    *logout({ payload }, { call, put, select }) {
      const { uid } = yield select(state => state.user);
      yield call(userService.logout, uid);
      localStorage.removeItem("token");
      localStorage.removeItem("uid");
      localStorage.removeItem("name");
      yield put({
        type: "save",
        payload: {
          token: "",
          uid: "",
          name: "",
          message: ""
        }
      });
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
