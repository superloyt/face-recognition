import React from 'react';
import { Layout } from 'antd';
import type { IProps } from './props';
import './styles.css';

const { Content } = Layout;

export default (props: IProps) => {
  const { children } = props;

  return (
    <Layout>
      <Content>
        {children}
      </Content>
    </Layout>
  );
};
