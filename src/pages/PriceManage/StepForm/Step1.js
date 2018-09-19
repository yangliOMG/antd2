import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Radio, Card , Checkbox, Col, Icon, Table} from 'antd';
import { EditableFormRow, EditableCell} from '@/components/EditableCell';
import router from 'umi/router';
import Yuan from '@/utils/Yuan';

import styles from './style.less';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

@connect(({ xinzhong, loading }) => ({
  towerListData: xinzhong.towerListData,
  loading: loading.effects['xinzhong/fetch'],
}))
@Form.create()
class Step1 extends React.PureComponent {
  
  constructor(props) {
    super(props)
    this.state = {
      checkedList: [],
      indeterminate: false,
      checkAll: false,
      expandTable: false,
      radioValue:"1",
      loading: true,
    }
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

  handleSave = (row) => {
    const newData = [...this.state.checkedList];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ checkedList: newData });
  }

  onRadioChange = (e) => {
    this.setState({
      radioValue: e.target.value
    })
  }

  onCheckboxChange = (checkedArr) => {
    const { towerListData } = this.props;
    const { checkedList } = this.state;
    let arr = []
    checkedArr.forEach(v=>{
      let obj = checkedList.find(c=>v===c.name)
      let obj2 = towerListData.find(c=>v===c.name)
      obj ? arr.push(obj) : arr.push(obj2)
    })
    this.setState({
      checkedList: arr,
      indeterminate: !!checkedArr.length && (checkedArr.length < towerListData.length),
      checkAll: checkedArr.length === towerListData.length,
    });
  }

  onCheckAllChange = (e) => {
    const { towerListData } = this.props;
    this.setState({
      checkedList: e.target.checked ? towerListData : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  }


  toggleTable = () => {
    const { expandTable } = this.state;
    this.setState({
      expandTable: !expandTable,
    });
  };

  renderTable() {
    const { expandTable } = this.state;
    return expandTable ? this.renderAdvancedTable() : this.renderSimpleTable();
  }

  renderSimpleTable(){
    return (
      <div>
        <span className={styles.textdesc}>当前价格</span>
          <a style={{ marginLeft: 8 }} onClick={this.toggleTable}>
            展开 <Icon type="down" />
          </a>
      </div>
    )
  }

  renderAdvancedTable(){
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

    const { towerListData } = this.props;

    return (
      <div>
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
        <div>
          <a style={{ marginLeft: 8 }} onClick={this.toggleTable}>
            收起 <Icon type="up" />
          </a>
        </div>
      </div>
    )
  }

  render() {
    const { checkedList, radioValue, loading: stateLoading } = this.state;
    const { form, dispatch, towerListData, loading: propsLoding, } = this.props;
    const loading = propsLoding || stateLoading;

    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        console.log("values",values)
        if (!err) {
          dispatch({
            type: 'form/saveStepFormData',
            payload: values,
          });
          router.push('/price/step-form/result');
        }
      });
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    }
    const formItemLayout = {
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 19,
      },
    };

    const columns = [
      {
        title: "塔名",
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: "1天",
        dataIndex: 'day',
        key: 'day',
        width:'20%',
        editable: true,
        render: d => d>0?<Yuan>{d}</Yuan>:'-' , 
      },
      {
        title: "1月",
        dataIndex: 'month',
        key: 'month',
        width:'20%',
        editable: true,
        render: d => d>0?<Yuan>{d}</Yuan>:'-' , 
      },
      {
        title: "1年",
        dataIndex: 'year',
        key: 'year',
        width:'20%',
        editable: true,
        render: d => d>0?<Yuan>{d}</Yuan>:'-' , 
      },
      {
        title: "长明",
        dataIndex: 'long',
        key: 'long',
        width:'20%',
        editable: true,
        render: d => d>0?<Yuan>{d}</Yuan>:'-' , 
      },
    ];

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columnss = columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    return (
      <Fragment>
        <Card bordered={false} loading={loading}>
          <Col xl={14}>
            <Form layout="horizontal" className={radioValue==='1'?styles.stepForm:styles.stepForm700} hideRequiredMark>
              <FormItem {...formItemLayout} label="祈福塔">
                {getFieldDecorator('facility', {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: '至少选一项',
                  //   },
                  // ],
                })(
                  <div>
                    <Checkbox
                      className={styles.allCheck}
                      indeterminate={this.state.indeterminate}
                      onChange={this.onCheckAllChange}
                      checked={this.state.checkAll}
                    >全选</Checkbox>
                    <CheckboxGroup options={towerListData.map(v=>v.name)} value={checkedList.map(v=>v.name)} onChange={this.onCheckboxChange} />
                  </div>
                )}
              </FormItem>
                <Col>
                  <span className={styles.price}>价格：</span>
                  <Radio.Group onChange={this.onRadioChange} value={radioValue}>
                    <Radio value="1">联合调价</Radio>
                    <Radio value="2">逐个调价</Radio>
                  </Radio.Group>
                </Col>
                { radioValue === "1"?
                  [
                    {text:'1天',id:'day'},
                    {text:'1月',id:'month'},
                    {text:'1年',id:'year'},
                    {text:'长明',id:'lang'},
                  ].map((v)=>
                      <FormItem key={v.id} {...formItemLayout} label={v.text}>
                        <span>￥</span>
                        {getFieldDecorator(v.id, {
                          rules: [
                            {
                              required: true,
                              message: '请填写价格',
                            },
                          ],
                        })(<Input placeholder={v.text} style={{ width: '200px' }}  />)}
                      </FormItem>
                  ):
                  <Table
                    rowKey={record => record.index}
                    columns={columnss}
                    dataSource={checkedList}
                    components={components}
                    rowClassName={() => 'editable-row'}
                    pagination={false}
                  />
                }
                

                <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                  <Button type="primary" htmlType="submit" onClick={onValidateForm}>
                    提交
                  </Button>
                </FormItem>
            </Form>
          </Col>
          <Col offset={1} xl={9}>
            <div className={styles.rightBlock}>{this.renderTable()}</div>
          </Col>
        </Card>
      </Fragment>
    );
  }
}

export default Step1