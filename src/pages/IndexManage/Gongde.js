import React, { Component } from 'react';
import { connect } from 'dva';
import { FormattedMessage } from 'umi/locale';
import { Row, Col, Tabs, Card, Table, } from 'antd';

import { ChartCard, MiniArea, MiniBar, Bar} from '@/components/Charts';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import Yuan from '@/utils/Yuan';

import styles from './Gongde.less';

const { TabPane } = Tabs;

@connect(({ gongde, chart  }) => ({
  gongde,
  chart,
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
        type: 'gongde/fetch',
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
      type: 'gongde/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  render() {
    const { loading: propsLoding, } = this.state;
    const { gongde, chart, loading: stateLoading } = this.props;
    const { visitData,salesData } = chart;
    const { facilityList, allMoney, beliversSum, currentLight, dayMoney, lightSum, successLight } = gongde;
    const loading = propsLoding || stateLoading;

    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
        render: (text, record, index)  => index + 1 , 
      },
      {
        title: '塔名',
        dataIndex: 'name',
      },
      {
        title: '已供灯数',
        dataIndex: 'theCurrentLight',
      },
      {
        title: '总灯数',
        dataIndex: 'theSumLight',
      },
    ]

    const topColResponsiveProps = { xs: 24, sm: 12, md: 12, lg: 12, xl: 6, }

    return (
      <GridContent>
        <Row gutter={24} style={{ marginBottom: 24 }}>
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
                        <div className={styles.content}>{currentLight}</div>
                      </ChartCard>
                    </Col>
                    <Col xl={12} className={styles.pad}>
                      <ChartCard
                        bordered={false}
                        loading={loading}
                        contentHeight={46}
                        footer={<div className={styles.describe}>总灯数</div>}
                      >
                        <div className={styles.content}>{lightSum}</div>
                      </ChartCard>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane
                  tab={<FormattedMessage id="app.gongde.xiangqing" defaultMessage="Details" />}
                  key="details"
                >
                  <Table
                    rowKey={record => record.id}
                    size="small"
                    columns={columns}
                    dataSource={facilityList}
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
              total={successLight}
              footer={<div className={styles.describe}>累计供灯数</div>}
            >
             <MiniArea color="#975FE4" data={visitData} />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              loading={loading}
              contentHeight={46}
              total={beliversSum}
              footer={<div className={styles.describe}>信众数</div>}
            >
              <MiniBar data={visitData} />
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
              <div className={styles.contentred}><Yuan>{dayMoney/100}</Yuan></div>
              </ChartCard>
            </Col>
            <Col xl={12}>
              <ChartCard
                bordered={false}
                loading={loading}
                contentHeight={150}
                title={<div className={styles.contentred}><Yuan>{allMoney/100}</Yuan></div>}
                footer={<div className={styles.describe}>累计功德</div>}
              >
                <Bar
                  height={150}
                  data={salesData}
                />
              </ChartCard>
            </Col>
          </Row>
        </Card>
      </GridContent>
    );
  }
}

export default Gongde;
