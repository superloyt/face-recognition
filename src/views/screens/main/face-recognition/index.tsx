import React, { useEffect } from 'react';
import { IProps } from './props';
import View from './views';

export default (props: IProps) => {
  const { onChangeFaceLoading } = props;
  useEffect(() => {
    onChangeFaceLoading(true);
    if (document.readyState === 'complete') {
      console.log('DONE LOADING');
      onChangeFaceLoading(false);
    }
  }, []);
  return (
    <View {...props} />
  );
};
