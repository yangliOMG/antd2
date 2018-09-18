import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Col,Row,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,Checkbox ,
  Tooltip,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Apply.less';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const plainOptions = ['Apple', 'Pear', 'Orange'];

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class Apply extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      checkedList: plainOptions,
      indeterminate: false,
      checkAll: true,
    };
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  onChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
      checkAll: checkedList.length === plainOptions.length,
    });
  }

  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  }

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderWrapper
        title="调价申请"
        content="用于调整祈福塔价格的申请表单。"
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
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
                  <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
                </div>
              )}
            </FormItem>
              <Col offset={6} className={styles.price}>价格：</Col>
              {
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
                )
              }
              <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                <Button type="primary" htmlType="submit" loading={submitting}>
                  提交
                </Button>
              </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Apply