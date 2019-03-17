import * as archiveServices from "../services/archive";

export default {
  namespace: "archive",

  state: {
    tags: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const parmas = pathname.split("/");
        if (parmas[1].toLowerCase() === "archive") {
          dispatch({ type: "fetchTags", payload: { page: 1 } });
        }
      });
    }
  },

  effects: {
    *fetchTags(
      {
        payload: { page }
      },
      { call, put }
    ) {
      const { data } = yield call(archiveServices.fetchTags, { page });
      yield put({ type: "save", payload: { tags: data } });
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
