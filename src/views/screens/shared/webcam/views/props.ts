import React from 'react';
import Webcam from 'react-webcam';

export type IFacingMode = 'user' | 'environment';
export type IFrameRate = 24 | 30 | 60;
export type IScreenshotFormat = 'image/jpeg' | 'image/png' | 'image/webp'

export interface IProps {
    webcamRef: React.MutableRefObject<Webcam>,
    facingMode: IFacingMode,
    frameRate: IFrameRate,
    width: number,
    height: number,
    screenshotFormat: IScreenshotFormat,
    audio: boolean,
    forceScreenshotSourceSize: boolean,
    aspectRatio?: number,
}
