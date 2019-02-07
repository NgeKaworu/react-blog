import * as pageService from "../services/page";
const init = {
  page: 0,
  total: 0,
  list: []
};
export default {
  namespace: "page",

  state: init,

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const parmas = pathname.split("/");
        const page = Number(parmas[1]) || 1;
        if (parmas.length < 3) {
          dispatch({ type: "fetch", payload: page });
        }
        if (parmas.length <= 3 && !parmas[2] && parmas[1] === "articles") {
          dispatch({ type: "fetch", payload: page });
        }
      });
    }
  },

  effects: {
    *fetch({ payload: page }, { call, put }) {
      const { data } = yield call(pageService.fetch, page);
      yield put({ type: "save", payload: { ...data, page } });
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
