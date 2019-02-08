import * as articleService from "../services/article";
import immutable from "immutable";
import { message } from "antd";
import router from "umi/router";

const init = {
  title: "",
  content: "",
  url: "",
  article_id: "",
  fileList: [],
  mode: "edit"
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
    *fetch(
      {
        payload: { article_id, mode = "view" }
      },
      { call, put }
    ) {
      const { data } = yield call(articleService.fetch, article_id);
      if (data) {
        yield put({
          type: "save",
          payload: {
            data: { ...data, mode }
          }
        });
      } else {
        router.push("/");
      }
    },

    *remove({ payload: id }, { call, put }) {
      yield call(articleService.remove, id);
      yield put({ type: "reload" });
      yield put({ type: "page/reload" });
    },

    *update(
      {
        payload: { id, values }
      },
      { call, put }
    ) {
      yield call(articleService.update, id, values);
      yield put({ type: "reload" });
    },

    *create({ payload: values }, { call, put }) {
      const { data } = yield call(articleService.create, values);
      if (data) {
        router.push({
          pathname: `/article/${data.article_id}`,
          state: { mode: "view" }
        });
      }
    },

    *reload(action, { put, select }) {
      const { article_id, mode } = yield select(state => ({
        article_id: state.article.getIn(["article_id"]),
        mode: state.article.getIn(["mode"])
      }));
      yield put({ type: "fetch", payload: { article_id, mode } });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, state }) => {
        const parmas = pathname.split("/");
        if (parmas[1] === "article") {
          if (parmas.length < 4 && parmas[2]) {
            const article_id = parmas[2];
            const mode = state && state.mode;
            dispatch({
              type: "fetch",
              payload: { article_id, mode }
            });
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
