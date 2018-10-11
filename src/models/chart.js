import { fakeChartData,getGongdeChart } from '@/services/api';
import moment from 'moment';


const visitData = [];
const beginDay = new Date().getTime();

const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY[i],
  });
}

export default {
  namespace: 'chart',

  state: {
    visitData,
    salesData:[] ,
    loading: false,
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *gongdeChart(_, { call, put }) {
      const response = yield call(getGongdeChart);
      yield put({
        type: 'save',
        payload: {
          salesData: response.map(v=>({...v,y:v.y/100})),
        },
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
        visitData: [],
        salesData: [],
      };
    },
  },
};
