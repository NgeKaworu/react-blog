import * as articleService from "../services/article";
import immutable from "immutable";
import { message } from "antd";

const init = {
  title: "",
  content: "",
  url: "",
  article_id: "",
  fileList: []
};
export default {
  namespace: "article",
  state: immutable.fromJS(init),
  reducers: {
    save(
      state,
      {
        payload: { data }
      }
    ) {
      return immutable.fromJS({ ...data });
    }
  },
  effects: {
    *fetch({ payload: article_id }, { call, put }) {
      const { data } = yield call(articleService.fetch, article_id);
      yield put({
        type: "save",
        payload: {
          data
        }
      });
    },
    *remove({ payload: id }, { call, put }) {
      yield call(articleService.remove, id);
      yield put({ type: "reload" });
    },
    *update(
      {
        payload: { id, values }
      },
      { call, put, select }
    ) {
      const { data } = yield call(articleService.update, id, values);
      if (!data) {
        message.error("修改失败, 请检查登录信息");
        const origin = yield select(state => state.article);
        yield put({
          type: "save",
          payload: { data: { ...origin.toJS(), status: "error" } }
        });
      }

      yield put({ type: "reload" });
    },
    *create({ payload: values }, { call, put }) {
      const { data } = yield call(articleService.create, values);
      if (data) {
        yield put({ type: "fetch", payload: data.article_id });
      }
    },
    *reload(action, { put, select }) {
      const article_id = yield select(state =>
        state.article.getIn(["article_id"])
      );

      yield put({ type: "fetch", payload: article_id });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const parmas = pathname.split("/");
        if (parmas[1] === "article") {
          if (parmas.length < 4 && parmas[2]) {
            const article_id = parmas[2];
            dispatch({ type: "fetch", payload: article_id });
          } else {
            dispatch({
              type: "save",
              payload: { data: init }
            });
          }
        }
      });
    }
  }
};
