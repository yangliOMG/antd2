import { xinzhongData } from '@/services/api';

export default {
  namespace: 'xinzhong',

  state: {
    xzListData: [],
    xzTypeDataSex: [],
    xzTypeDataAddr: [],
    loading: false,
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(xinzhongData);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        xzListData: [],
        xzTypeDataSex: [],
        xzTypeDataAddr: [],
      };
    },
  },
};
