import React, { Component } from 'react';
import { connect } from 'dva';
import { FormattedMessage } from 'umi/locale';
import {
  Row,
  Col,
  Tabs,
  Card,
  Table,
} from 'antd';
import {
  ChartCard,
} from '@/components/Charts';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import Yuan from '@/utils/Yuan';

import styles from './Gongde.less';

const { TabPane } = Tabs;

@connect(({ xinzhong, loading }) => ({
  xinzhong,
  loading: loading.effects['xinzhong/fetch'],
}))
class Gongde extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'xinzhong/fetch',
      });
      this.timeoutId = setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 600);
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'xinzhong/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  render() {
    const { loading: propsLoding, } = this.state;
    const { xinzhong, loading: stateLoading } = this.props;
    const {
      towerListData,
      count,
    } = xinzhong;
    const loading = propsLoding || stateLoading;


    const columns = [
      {
        title: <FormattedMessage id="app.gongde.table.index" defaultMessage="Idx" />,
        dataIndex: 'index',
        key: 'index',
      },
      {
        title: <FormattedMessage id="app.gongde.table.name" defaultMessage="Name" />,
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: <FormattedMessage id="app.gongde.table.yigong" defaultMessage="Selected" />,
        dataIndex: 'yigong',
        key: 'yigong',
      },
      {
        title: <FormattedMessage id="app.gongde.table.total" defaultMessage="Total" />,
        dataIndex: 'total',
        key: 'total',
      },
    ]

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

    return (
      <GridContent>
        <Row gutter={24}>
          <Col {...topColResponsiveProps} xl={12}>
            <Card bordered={false} bodyStyle={{ paddingTop: 0, paddingBottom: 0,}}>
              <Tabs tabBarStyle={{ marginBottom: 0 }}>
                <TabPane
                  tab={<FormattedMessage id="app.gongde.zongliang" defaultMessage="Total" />}
                  key="total"
                >
                  <Row gutter={24}>
                    <Col xl={12} className={styles.pad}>
                      <ChartCard
                        bordered={false}
                        loading={loading}
                        contentHeight={46}
                        footer={<div className={styles.describe}>已供灯数</div>}
                      >
                        <div className={styles.content}>{count.yigong}</div>
                      </ChartCard>
                    </Col>
                    <Col xl={12} className={styles.pad}>
                      <ChartCard
                        bordered={false}
                        loading={loading}
                        contentHeight={46}
                        footer={<div className={styles.describe}>总灯数</div>}
                      >
                        <div className={styles.content}>{count.total}</div>
                      </ChartCard>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane
                  tab={<FormattedMessage id="app.gongde.xiangqing" defaultMessage="Details" />}
                  key="details"
                >
                  <Table
                    rowKey={record => record.index}
                    size="small"
                    columns={columns}
                    dataSource={towerListData}
                    pagination={{
                      style: { marginBottom: 0 },
                      pageSize: 5,
                    }}
                  />
                </TabPane>
              </Tabs>
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              loading={loading}
              contentHeight={46}
              footer={<div className={styles.describe}>累计供灯数</div>}
            >
             <div className={styles.content}>{count.yigongtotal}</div>
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              loading={loading}
              contentHeight={46}
              footer={<div className={styles.describe}>信众数</div>}
            >
             <div className={styles.content}>{count.xinzhong}</div>
            </ChartCard>
          </Col>
        </Row>

        <Card
          loading={loading}
          title="收益"
          bordered={false} 
        >
          <Row gutter={24}>
            <Col xl={12}>
              <ChartCard
                bordered={false}
                loading={loading}
                contentHeight={46}
                footer={<div className={styles.describe}>今日功德</div>}
              >
              <div className={styles.contentred}><Yuan>12.3</Yuan></div>
              </ChartCard>
            </Col>
            <Col xl={12}>
              <ChartCard
                bordered={false}
                loading={loading}
                contentHeight={46}
                footer={<div className={styles.describe}>累计功德</div>}
              >
              <div className={styles.contentred}><Yuan>{count.gongdetotal}</Yuan></div>
              </ChartCard>
            </Col>
          </Row>
        </Card>
      </GridContent>
    );
  }
}

export default Gongde;
