import React from 'react';
import isMobile from 'src/utils/is-mobile';
import type { IProps } from './props';
import './styles.css';

export default (props: IProps) => {
  const { children } = props;

  return (
    <div className={isMobile ? 'mobile-view-container' : 'desktop-view-container'}>
      {children}
    </div>
  );
};
