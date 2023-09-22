import React from 'react';
import Webcam from 'react-webcam';
import { IProps } from './props';

export default (props: IProps) => {
  const {
    webcamRef, audio, facingMode, forceScreenshotSourceSize,
    width, height, frameRate, screenshotFormat, aspectRatio,
  } = props;
  return (
    <Webcam
      ref={webcamRef}
      audio={audio}
      width={480}
      height={720}
      mirrored={facingMode === 'user'}
      screenshotFormat={screenshotFormat}
      forceScreenshotSourceSize={forceScreenshotSourceSize}
      videoConstraints={{
        width: { min: 480 },
        height: { min: 720 },
        frameRate,
        facingMode,
        aspectRatio: 0.6666666667,
      }}
    />
  );
};
