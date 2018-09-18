import React, { Component } from 'react';
import { connect } from 'dva';
import { FormattedMessage } from 'umi/locale';
import {
  Row,
  Col,
  Card,
  Table,
  Radio, Avatar
} from 'antd';
import {
  Pie,
} from '@/components/Charts';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

import styles from './Xinzhong.less';


@connect(({ xinzhong, loading }) => ({
  xinzhong,
  loading: loading.effects['xinzhong/fetch'],
}))
class Xinzhong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xzType: 'sex',
      loading: true,
    };
  }

  state = {
    xzType: 'sex',
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

  handleChangeXzType = e => {
    this.setState({
      xzType: e.target.value,
    });
  }

  render() {
    const {  xzType, loading: propsLoding, } = this.state;
    const { xinzhong, loading: stateLoading } = this.props;
    const {
      xzListData,
      xzTypeDataSex,
      xzTypeDataAddr,
    } = xinzhong;
    const loading = propsLoding || stateLoading;
    let xzPieData = xzType === 'sex' ? xzTypeDataSex : xzTypeDataAddr;

    const columns = [
      {
        title: <FormattedMessage id="app.manage.table.index" defaultMessage="Idx" />,
        dataIndex: 'index',
        key: 'index',
      },
      {
        title: <FormattedMessage id="app.manage.table.nick" defaultMessage="Nick" />,
        dataIndex: 'nick',
        key: 'nick',
      },
      {
        title: <FormattedMessage id="app.manage.table.img" defaultMessage="Img" />,
        dataIndex: 'img',
        key: 'img',
        render: src => <Avatar size="large" src={src} /> , 
      },
    ];

    return (
      <GridContent>
        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              bordered={false}
              title={
                <FormattedMessage
                  id="app.manage.xinzhongList"
                  defaultMessage="Believers List"
                />
              }
            >
              <Table
                rowKey={record => record.index}
                size="middle"
                columns={columns}
                dataSource={xzListData}
                pagination={{
                  style: { marginBottom: 0 },
                  pageSize: 5,
                  size:"large"
                }}
              />
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.xzCard}
              bordered={false}
              title={
                <FormattedMessage
                  id="app.manage.the-proportion-of-xinzhong"
                  defaultMessage="The Proportion of xinzhong"
                />
              }
              bodyStyle={{ padding: 24 }}
              style={{ minHeight: 509 }}
              extra={
                <div className={styles.xzCardExtra}>
                  <div className={styles.xzTypeRadio}>
                    <Radio.Group value={xzType} onChange={this.handleChangeXzType}>
                      <Radio.Button value="sex">
                        <FormattedMessage id="app.manage.channel.sex" defaultMessage="Sex" />
                      </Radio.Button>
                      <Radio.Button value="addr">
                        <FormattedMessage id="app.manage.channel.addr" defaultMessage="Addr" />
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              }
            >
              <Pie
                hasLegend
                subTitle={<FormattedMessage id="app.manage.xinzhong" defaultMessage="Believers" />}
                total={() => <span>{xzPieData.reduce((pre, now) => now.y + pre, 0)}人</span>}
                data={xzPieData}
                valueFormat={value => <span>{value}人</span>}
                height={248}
                lineWidth={4}
              />
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Xinzhong;
