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
        const page = Number(parmas[1]);
        if (!isNaN(page) && parmas.length < 3) {
          dispatch({ type: "fetch", payload: page || 1 });
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
