import { getGongdeInfo} from '@/services/api';

export default {
  namespace: 'gongde',

  state: {
    facilityList: [],
    beliversSum: 0,
    lightSum: 0,
    currentLight: 0,
    successLight: 0,
    dayMoney: 0,
    allMoney: 0,
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getGongdeInfo);
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
        facilityList: [],
        beliversSum: 0,
        lightSum: 0,
        currentLight: 0,
        successLight: 0,
        dayMoney: 0,
        allMoney: 0,
      };
    },
  },
};
