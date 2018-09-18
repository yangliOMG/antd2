import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Card , Checkbox, Col} from 'antd';
import router from 'umi/router';
import styles from './style.less';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange'];

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};


@connect(({ form }) => ({
  data: form.step,
}))
@Form.create()
class Step1 extends React.PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
      checkedList: plainOptions,
      indeterminate: false,
      checkAll: true,
    };
  }

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
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
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
    };

    return (
      <Fragment>
        <Card bordered={false}>
          <Form layout="horizontal" className={styles.stepForm} hideRequiredMark >
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
                <Button type="primary" htmlType="submit" onClick={onValidateForm}>
                  提交
                </Button>
              </FormItem>
          </Form>
        </Card>
      </Fragment>
    );
  }
}

export default Step1