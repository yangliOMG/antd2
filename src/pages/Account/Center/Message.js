import React, { PureComponent } from 'react';
import { List, Icon, Avatar, Tag } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import styles from './Message.less';

@connect(({ list }) => ({
  list,
}))
class Message extends PureComponent {

  handleMarked(id,sta){
    if(sta === 0){
      const { dispatch, list: { list }, } = this.props;
  
      list.find(v=>v.id===id).status = 1
      dispatch({
        type: 'list/queryList',
        payload: list,
      });
    }
  }

  render() {
    const { list: { list }, } = this.props;

    const ListContent = ({ data: { time } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <p>{moment(time).format('YYYY-MM-DD HH:mm')}</p>
        </div>
      </div>
    );
    
    const icon = { 101:{type:"check-circle", color:"#52c41a"}, 102:{type:"close-circle", color:"#eb2f96"},}
    return (
      <List
        size="large"
        rowKey="id"
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={
                <a className={item.status === 1? styles.readed : styles.unread} onClick={()=>this.handleMarked(item.id, item.status)}>
                  <Icon type={icon[item.type].type} theme="twoTone" twoToneColor={icon[item.type].color} />
                  {item.title}
                </a>}
              description={item.subDescription}
            />
            <ListContent data={item} />
          </List.Item>
        )}
      />
    );
  }
}
export default Message
