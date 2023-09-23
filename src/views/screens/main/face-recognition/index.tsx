import React from 'react';
import { IProps } from './props';
import View from './views';

export default (props: IProps) => {
  return (
    <View {...props} />
  );
};
