// mock data
const xzListData = []
const arr1 = ['赵','钱','孙','李','周','吴','郑','王']
const arr2 = ['一','二','三','四','五','六','七','八']
for (let i = 0; i < 50; i += 1) {
  xzListData.push({
    index: i + 1,
    nick: arr1[Math.floor(Math.random()*arr1.length)] + arr2[Math.floor(Math.random()*arr2.length)],
    img: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
  })
}
const xzTypeDataSex = [
  {
    x: '男',
    y: 111,
  },
  {
    x: '女',
    y: 222,
  },
];

const xzTypeDataAddr = [
  {
    x: '浙江',
    y: 244,
  },
  {
    x: '江苏',
    y: 321,
  },
  {
    x: '北京',
    y: 311,
  },
  {
    x: '天津',
    y: 41,
  },
  {
    x: '四川',
    y: 121,
  },
  {
    x: '其他',
    y: 111,
  },
];

const data = {
  xzListData,
  xzTypeDataSex,
  xzTypeDataAddr,
};

export default {
  'GET /api/xinzhong_data': data,
};
