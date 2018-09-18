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

const towerListData = []
const count = {
  yigong:0,
  total:0,
  yigongtotal:Math.floor(Math.random()*2000+1000),
  xinzhong:Math.floor(Math.random()*1000+300),
  gongde:12341,
  gongdetotal:12322141,
}
for (let i = 0; i < 4; i += 1) {
  let yigong = Math.floor(Math.random()*265)
  count.yigong += yigong
  count.total += 1920
  towerListData.push({
    index: i + 1,
    name: `灵隐寺${arr2[i]}号塔` ,
    yigong ,
    total: 1920,
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
  towerListData,
  count,
  xzTypeDataSex,
  xzTypeDataAddr,
};

export default {
  'GET /api/xinzhong_data': data,
};
