import * as pageService from "../services/articleList";

const init = {
  tagPage: 0,
  page: 0,
  total: 0,
  tag: "",
  list: []
};
export default {
  namespace: "articleList",

  state: init,

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const parmas = pathname.split("/");
        const page = Number(parmas[1]) || 1;
        if (!isNaN(page) && parmas.length < 3) {
          dispatch({ type: "fetch", payload: { page } });
        } else if (parmas[1].toLowerCase() === "archive") {
          const tag = parmas[2];
          const page = Number(parmas[3]) || 1;
          dispatch({ type: "fetch", payload: { page, tag } });
        }
      });
    }
  },

  effects: {
    *fetch(
      {
        payload: { page, tag }
      },
      { call, put }
    ) {
      if (!tag) {
        const { data } = yield call(pageService.fetch, { page });
        yield put({
          type: "save",
          payload: { ...(data || { list: [] }), page }
        });
      } else {
        const { data } = yield call(pageService.fetchTag, { page, tag });
        yield put({
          type: "save",
          payload: { ...(data || { list: [] }), tagPage: page, tag }
        });
      }
    },

    *reload(action, { put, select }) {
      const { page, tagPage, tag } = yield select(
        ({ articleList: { page, tagPage, tag } }) => ({
          page,
          tagPage,
          tag
        })
      );
      yield put({ type: "fetch", payload: { page: tagPage || page, tag } });
    }
  },

  reducers: {
    save(state, action) {
      return action.payload;
    }
  }
};
