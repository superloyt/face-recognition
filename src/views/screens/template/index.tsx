import React from 'react';
import { IProps } from './props';
import View from './view';

export default (props: IProps) => {
  return (
    <View {...props} />
  );
};
