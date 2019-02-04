import * as editService from "../services/edit";

export default {
  namespace: "edit",
  state: {
    title: "",
    content: "",
    url: "",
    article_id: "",
    fileList: []
  },
  reducers: {
    save(
      state,
      {
        payload: { data }
      }
    ) {
      return { ...data };
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
    *patch(
      {
        payload: { id, values }
      },
      { call, put }
    ) {
      yield call(editService.patch, id, values);
      yield put({ type: "reload" });
    },
    *create({ payload: values }, { call, put }) {
      const { data } = yield call(editService.create, values);
      yield put({ type: "fetch", payload: data.article_id });
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.users.page);
      yield put({ type: "fetch", payload: { page } });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const parmas = pathname.split("/");
        if (parmas[1] === "edit" && parmas.length < 4 && parmas[2]) {
          const article_id = parmas[2];
          dispatch({ type: "fetch", payload: article_id });
        }
      });
    }
  }
};
