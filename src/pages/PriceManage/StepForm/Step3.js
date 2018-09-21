import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
// import router from 'umi/router';
import Result from '@/components/Result';
import Yuan from '@/utils/Yuan';

import styles from './style.less';

@connect(({ xinzhong }) => ({
  towerListDataManage: xinzhong.towerListDataManage,
}))
class Step3 extends React.PureComponent {
  render() {
    const { towerListDataManage } = this.props;
    // const onFinish = () => {
    //   router.push('/price/step-form/info');
    // };
    const columns = [
      {
        title: "序号",
        dataIndex: 'index',
        key: 'index',
      },
      {
        title: "塔名",
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: "1天",
        dataIndex: 'day',
        key: 'day',
        render: d => <Yuan>{d}</Yuan> , 
      },
      {
        title: "1月",
        dataIndex: 'month',
        key: 'month',
        render: d => <Yuan>{d}</Yuan> , 
      },
      {
        title: "1年",
        dataIndex: 'year',
        key: 'year',
        render: d => <Yuan>{d}</Yuan> , 
      },
      {
        title: "长明",
        dataIndex: 'long',
        key: 'long',
        render: d => <Yuan>{d}</Yuan> , 
      },
    ];
    const information = (
      <Table
          rowKey={record => record.index}
          columns={columns}
          dataSource={towerListDataManage}
          pagination={false}
        />
    )
    // const actions = (
    //   <Fragment>
    //     <Button type="primary" onClick={onFinish}>
    //       再转一笔
    //     </Button>
    //     <Button>查看账单</Button>
    //   </Fragment>
    // );
    return (
      <Result
        type="success"
        title="操作成功"
        description="调价申请已提交"
        extra={information}
        // actions={actions}
        className={styles.result}
      />
    );
  }
}
export default Step3