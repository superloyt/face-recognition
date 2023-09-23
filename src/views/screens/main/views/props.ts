import React from 'react';
import type { IFrameRate, IProps as IViewProps } from '../../shared/webcam/views/props';

export type IImageResolution = {
    width: number;
    height: number;
}

export type IProps = IViewProps & {
    isPageLoading: boolean;
    isFaceLoading: boolean;
    image: string | null;
    onChangeResolution: (value: any) => void;
    onChangeFrameRate: (value: any) => void;
    onSwitchCamera: () => void;
    onCaptureImage: () => void;
    messageDisplay: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    imageResolution: IImageResolution;
    onDetectFace: () => void;
    onRetakeImage:() => void;
    isMobile: boolean;
}
