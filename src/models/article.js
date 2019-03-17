import * as articleService from "../services/article";
import immutable from "immutable";
import router from "umi/router";

const init = {
  title: "",
  content: "",
  url: "",
  article_id: "",
  fileList: [],
  mode: "edit",
  tags: []
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
        router.replace("/");
      }
    },

    *remove({ payload: id }, { call }) {
      yield call(articleService.remove, id);
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

    *reload(action, { select }) {
      const article_id = yield select(state =>
        state.article.getIn(["article_id"])
      );
      router.replace({
        pathname: `/article/${article_id}`,
        state: { mode: "view" }
      });
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
