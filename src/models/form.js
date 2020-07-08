import { addRule, getPage, addviualRule } from '../services/api';

export default {
  namespace: 'form',
  state: {
    data: {
      result: {},
      per_info: {},
      spider_info: [],
    },
  },
  effects: {
    *page({ payload }, { call, put }) {
      let response;
      if (payload.url) {
        if (payload.per_url) {
          response = yield call(getPage, { url: payload.url, per_url: payload.per_url });
        } else {
          response = yield call(getPage, { url: payload.url });
        }
      } else {
        response = { result: { html: '' } };
      }
      response['per_info'] = payload.per_info;
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *result({ payload }, { call, put }) {
      yield put({
        type: 'show',
        payload: { spider_info: payload.spider_info },
      });
    },
    *addviualRule({ payload, callback }, { call, put }) {
      const response = yield call(addviualRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    show(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
