import { xinzhongData, queryApply, removeApply} from '@/services/api';

export default {
  namespace: 'xinzhong',

  state: {
    xzListData: [],
    towerListData: [],
    towerListDataManage: [],
    applyList:{
      list: [],
      pagination: {},
    },
    count:{},
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
    *fetchApply({ payload }, { call, put }) {
      const response = yield call(queryApply, payload);
      yield put({
        type: 'saveApply',
        payload: response,
      });
    },
    *removeApply({ payload, callback }, { call, put }) {
      const response = yield call(removeApply, payload);
      yield put({
        type: 'saveApply',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        towerListDataManage: payload,
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
        xzListData: [],
        towerListData: [],
        count:{},
        xzTypeDataSex: [],
        xzTypeDataAddr: [],
      };
    },
  },
};
