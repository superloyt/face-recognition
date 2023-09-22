import React from 'react';
import { IProps } from './props';
import View from './views';

export default (props: IProps) => {
  const {
    webcamRef, audio, facingMode, forceScreenshotSourceSize,
    width, height, frameRate, screenshotFormat,
  } = props;
  return (
    <View
      webcamRef={webcamRef}
      audio={audio}
      facingMode={facingMode}
      frameRate={frameRate}
      screenshotFormat={screenshotFormat}
      forceScreenshotSourceSize={forceScreenshotSourceSize}
      width={width}
      height={height}
    />
  );
};
