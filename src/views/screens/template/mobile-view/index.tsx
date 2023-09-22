import React from 'react';
import View from './view';
import type { IProps } from './props';

export default (props: IProps) => {
  return (
    <View {...props} />
  );
};
