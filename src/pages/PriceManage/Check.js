import React, { PureComponent, Fragment } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import moment from 'moment';
import {
  Card,
  Form,
  Icon,
  Button,
  Dropdown,
  Menu,
  Modal,
  message,
  Divider,
  Table,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Yuan from '@/utils/Yuan';

import styles from './style.less';

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect(({ xinzhong, loading }) => ({
  applyList: xinzhong.applyList, 
  loading: loading.effects['xinzhong/fetch'],
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
  };

  columns = [
    {
      title: '申请人',
      dataIndex: 'applyman',
    },
    {
      title: '申请时间',
      dataIndex: 'time',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '相关塔名',
      dataIndex: 'desc',
      render: arr => arr.map(v=>v.name).join('/'),
    },
    {
      title: '操作',
      render: (row) => (
        <Fragment>
          <a onClick={() =>this.passAndFail(row.key,'fail')}>不通过</a>
          <Divider type="vertical" />
          <a onClick={() =>this.passAndFail(row.key,'pass')}>通过</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'xinzhong/fetchApply',
    });
  }
  
  expandedRowRender = (record) => {
    const col = [
      { title: '塔名', dataIndex: 'name', key: 'name' },
      { title: '天', dataIndex: 'day', key: 'day', render: v => <Yuan>{v}</Yuan> },
      { title: '月', dataIndex: 'month', key: 'month', render: v => <Yuan>{v}</Yuan> },
      { title: '年', dataIndex: 'year', key: 'year', render: v => <Yuan>{v}</Yuan> },
      { title: '长明', dataIndex: 'long', key: 'long', render: v => <Yuan>{v}</Yuan> },
    ];
    return (
      <Table
        size='small'
        columns={col}
        dataSource={record.desc}
        pagination={false}
      />
    );
  }

  passAndFail = (key, type) => {
    const text = type === 'pass' ? '通过':'不通过'
    Modal.confirm({
      title: `审核${text}`,
      content: `确定${text}该调价申请吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => this.handleDeleteItem(key),
    });
  }

  handleDeleteItem = key => {
    const { dispatch } = this.props;
    dispatch({
      type: 'xinzhong/removeApply',
      payload: { key:[key] },
    });
    message.success('操作成功');
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'xinzhong/fetchApply',
      payload: params,
    });
  }

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'rule/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleCreate = () => {
    router.push('/price/step-form/info');
  }

  render() {
    const { applyList, loading, } = this.props;
    const { selectedRows, } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    return (
      <PageHeaderWrapper title="审核表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleCreate(true)}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={applyList}
              columns={this.columns}
              expandedRowRender={record => this.expandedRowRender(record)}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default TableList
