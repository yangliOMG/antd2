import React, { Fragment } from 'react';
import Link from 'umi/link';
import { Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';

const links = [
  {
    key: 'help',
    title: '帮助',
    href: 'https://www.fuyoufayuan.com/html/index.html',
  },
  {
    key: 'site',
    title: '官网',
    href: 'https://www.fuyoufayuan.com/html/index.html',
  },
  {
    key: 'terms',
    title: '条款',
    href: 'https://www.fuyoufayuan.com/html/index.html',
  },
];

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2018 瑞金网络 & 蚂蚁金服出品
  </Fragment>
);

class UserLayout extends React.PureComponent {
  // @TODO title
  // getPageTitle() {
  //   const { routerData, location } = this.props;
  //   const { pathname } = location;
  //   let title = 'Ant Design Pro';
  //   if (routerData[pathname] && routerData[pathname].name) {
  //     title = `${routerData[pathname].name} - Ant Design Pro`;
  //   }
  //   return title;
  // }

  render() {
    const { children } = this.props;
    return (
      // @TODO <DocumentTitle title={this.getPageTitle()}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>祈福塔</span>
            </div>
            <div className={styles.desc}>祈福塔后台管理系统</div>
          </div>
          {children}
        </div>
        <GlobalFooter links={links} copyright={copyright} />
      </div>
    );
  }
}

export default UserLayout;
