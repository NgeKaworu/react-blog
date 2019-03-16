import * as userService from "../services/user";
import { message } from "antd";

const init = {
  token: "",
  uid: "",
  name: "",
  message: ""
};

export default {
  namespace: "user",

  state: init,

  subscriptions: {
    setup({ dispatch, history }) {
      if (localStorage.getItem("token"))
        dispatch({
          type: "checkToken"
        });

      return history.listen(({ pathname }) => {
        if (pathname === "/logout") {
          dispatch({
            type: "logout"
          });
          history.replace("/");
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
        yield put({ type: "save", payload: data });
      } else {
        message.error("登陆失败");
      }
    },

    *logout({ payload }, { call, put, select }) {
      const { uid } = yield select(state => state.user);
      yield call(userService.logout, uid);
      localStorage.removeItem("token");
      yield put({
        type: "save",
        payload: init
      });
    },

    *checkToken({ payload }, { put, call }) {
      const { data, err } = yield call(userService.checkToken);

      if (err) {
        localStorage.removeItem("token");
      }

      if (data) {
        yield put({ type: "save", payload: data });
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
