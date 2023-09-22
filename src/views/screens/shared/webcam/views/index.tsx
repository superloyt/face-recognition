import React from 'react';
import Webcam from 'react-webcam';
import { IProps } from './props';

export default (props: IProps) => {
  const {
    webcamRef, audio, facingMode, forceScreenshotSourceSize,
    width, height, frameRate, screenshotFormat,
  } = props;
  return (
    <Webcam
      ref={webcamRef}
      audio={audio}
      mirrored={facingMode === 'user'}
      screenshotFormat={screenshotFormat}
      forceScreenshotSourceSize={forceScreenshotSourceSize}
      videoConstraints={{
        width,
        height,
        frameRate,
        facingMode,
      }}
    />
  );
};
