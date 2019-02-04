import * as editService from "../services/edit";
import immutable from "immutable";
export default {
  namespace: "edit",
  state: immutable.fromJS({
    title: "",
    content: "",
    url: "",
    article_id: "",
    fileList: []
  }),
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
      const { data } = yield call(editService.fetch, article_id);
      yield put({
        type: "save",
        payload: {
          data
        }
      });
    },
    *remove({ payload: id }, { call, put }) {
      yield call(editService.remove, id);
      yield put({ type: "reload" });
    },
    *update(
      {
        payload: { id, value }
      },
      { call, put }
    ) {
      yield call(editService.update, id, value);
      yield put({ type: "reload" });
    },
    *create({ payload: value }, { call, put }) {
      const { data } = yield call(editService.create, value);
      yield put({ type: "fetch", payload: data.article_id });
    },
    *reload(action, { put, select }) {
      const article_id = yield select(state =>
        state.edit.getIn(["article_id"])
      );

      yield put({ type: "fetch", payload: article_id });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const parmas = pathname.split("/");
        if (parmas[1] === "edit") {
          if (parmas.length < 4 && parmas[2]) {
            const article_id = parmas[2];
            dispatch({ type: "fetch", payload: article_id });
          } else {
            dispatch({
              type: "save",
              payload: {
                data: {
                  title: "",
                  content: "",
                  url: "",
                  article_id: "",
                  fileList: []
                }
              }
            });
          }
        }
      });
    }
  }
};
