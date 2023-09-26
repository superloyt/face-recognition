/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import { message } from 'antd';
import path from 'path-browserify';
import isMobile from '../../../utils/is-mobile';
import {
  MODEL_FILENAMES, REAL_FACE_WIDTH, CALIBRATED_FOCAL_LENGTH,
} from '../../../constants/face-recogntion';
import { IFacingMode, IFrameRate } from '../shared/webcam/views/props';
import { HD_READY_RESOLUTION, MOBILE_RESOLUTION } from '../../../constants/webcam';
import View from './views';
import { IImageResolution } from './views/props';

export default () => {
  const { innerWidth, innerHeight } = window;
  const mobileWidthAspectRatio = Number(Math.ceil(innerWidth / 1.2));
  const phoneHeightAspectRatio = Number(Math.ceil(innerHeight / 1.2));
  const webcamRef = useRef<Webcam>(null);
  const [messageApi, messageDisplay] = message.useMessage();
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const [isFaceLoading, setIsFaceLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<IFacingMode>('user');
  const [imageResolution, setImageResolution] = useState<IImageResolution>(isMobile ? MOBILE_RESOLUTION : HD_READY_RESOLUTION);
  const [width, setWidth] = useState<number>(isMobile ? mobileWidthAspectRatio : HD_READY_RESOLUTION.width);
  const [height, setHeight] = useState<number>(isMobile ? phoneHeightAspectRatio : HD_READY_RESOLUTION.height);
  const [frameRate, setFrameRate] = useState<IFrameRate>(24);
  let optionsTinyFaceDetector: faceapi.SsdMobilenetv1Options | faceapi.MtcnnOptions | faceapi.TinyYolov2Options | undefined;

  const modelFinder = (fileName: string) => {
    return path.join('/models', fileName);
  };

  const loadModels = async () => {
    setIsPageLoading(true);
    try {
      await faceapi.nets.ssdMobilenetv1.load(modelFinder(MODEL_FILENAMES.Mobilenetv1Model));
      await faceapi.nets.faceLandmark68Net.load(modelFinder(MODEL_FILENAMES.FaceLandmarkModel));
      optionsTinyFaceDetector = new faceapi.TinyFaceDetectorOptions();
    } catch (error) {
      messageApi.warning('Models did not load successfully. Refresh the page.');
    }
    setIsPageLoading(false);
  };

  const calculateDistance = async (detection: any) => {
    const faceWidth = detection.detection.box.width;
    const distance = (REAL_FACE_WIDTH * CALIBRATED_FOCAL_LENGTH) / faceWidth;
    return distance;
  };

  const printFace = async (detection: any) => {
    const distance = await calculateDistance(detection);
    const displaySize = { width, height };
    const canvas = document.getElementById('faceDetection') as any;
    faceapi.matchDimensions(canvas, displaySize);
    const resizedDetections = faceapi.resizeResults(detection, displaySize);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    const drawBox = new faceapi.draw.DrawTextField(['Estimated Distance:', `${distance.toFixed(2)} meters`], {
      x: 200,
      y: 200,
    });
    drawBox.draw(canvas);
    setIsFaceLoading(false);
  };

  const detectFace = async () => {
    const input = document.getElementById('imagePreview') as faceapi.TNetInput;
    const detections = await faceapi.detectAllFaces(input, optionsTinyFaceDetector).withFaceLandmarks();
    if (detections.length === 0) {
      messageApi.warning('No face detected.');
      setIsFaceLoading(false);
      return;
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const detection of detections) {
      printFace(detection);
    }
  };

  const onClearCanvas = () => {
    const canvas = document.getElementById('faceDetection') as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = 0;
    canvas.height = 0;
  };

  const onChangeResolution = (value: any) => {
    const resolution: IImageResolution = JSON.parse(value.key);
    setImageResolution(resolution);
  };

  const onChangeFrameRate = (value: any) => {
    setIsPageLoading(true);
    const frameRateKey: IFrameRate = JSON.parse(value.key);
    setFrameRate(frameRateKey);
    setIsPageLoading(false);
  };

  const onSwitchCamera = () => {
    setFacingMode(facingMode === 'user' ? 'environment' : 'user');
  };

  const onCaptureImage = () => {
    const imageSrc = webcamRef.current?.getScreenshot(imageResolution);
    setImage(imageSrc!);
  };

  const onDetectFace = () => {
    setIsFaceLoading(true);
    detectFace();
  };

  const onRetakeImage = () => {
    onClearCanvas();
    setImage(null);
  };

  useEffect(() => {
    loadModels();
  }, []);

  return (
    <View
      webcamRef={webcamRef}
      facingMode={facingMode}
      frameRate={frameRate}
      width={width}
      height={height}
      screenshotFormat="image/jpeg"
      audio={false}
      forceScreenshotSourceSize={false}
      isPageLoading={isPageLoading}
      isFaceLoading={isFaceLoading}
      image={image}
      onCaptureImage={onCaptureImage}
      onChangeFrameRate={onChangeFrameRate}
      onChangeResolution={onChangeResolution}
      onSwitchCamera={onSwitchCamera}
      messageDisplay={messageDisplay}
      imageResolution={imageResolution}
      onDetectFace={onDetectFace}
      onRetakeImage={onRetakeImage}
      isMobile={isMobile}
    />
  );
};
