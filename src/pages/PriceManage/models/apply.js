import { addApply, queryApply, removeApply} from '@/services/api';

export default {
  namespace: 'apply',

  state: {
    facilityPriceList: [],
    applyList:{
      list: [],
      pagination: {},
    },
    loading: false,
  },

  effects: {
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addApply, payload);
      yield put({
        type: 'saveStepFormData',
        payload: response,
      });
      if (callback) callback();
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryApply, payload);
      yield put({
        type: 'saveApply',
        payload: response,
      });
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeApply, payload);
      yield put({
        type: 'saveApply',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        facilityPriceList: payload,
      };
    },
    saveApply(state, { payload }) {
      console.log('payload',payload)
      return {
        ...state,
        applyList: payload,
      };
    },
    clear() {
      return {
        facilityList: [],
      };
    },
  },
};
