/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  Row, Col, Button, Space, Spin, Dropdown,
} from 'antd';
import { CameraOutlined, SwapOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import Webcam from '../../shared/webcam';
import FaceDetect from '../face-recognition';
import { IProps } from './props';
import './styles.css';
import { FULL_HD_RESOLUTION, HD_READY_RESOLUTION, UHD_RESOLUTION } from '../../../../constants/webcam';

export default (props: IProps) => {
  const {
    webcamRef, messageDisplay,
    facingMode, frameRate, image,
    width, height, screenshotFormat,
    audio, forceScreenshotSourceSize,
    isPageLoading, isFaceLoading, isMobile,
    onChangeResolution, onChangeFrameRate,
    onSwitchCamera, onCaptureImage,
    onDetectFace, onRetakeImage,
  } = props;

  const desktopItems: MenuProps['items'] = [
    { label: 'HD Ready', key: JSON.stringify(HD_READY_RESOLUTION) },
    { label: 'Full HD', key: JSON.stringify(FULL_HD_RESOLUTION) },
    { label: 'UHD', key: JSON.stringify(UHD_RESOLUTION) },
  ];

  const mobileItems: MenuProps['items'] = [
    { label: 'HD Ready', key: JSON.stringify({ width: HD_READY_RESOLUTION.height, height: HD_READY_RESOLUTION.width }) },
    { label: 'Full HD', key: JSON.stringify({ width: FULL_HD_RESOLUTION.height, height: FULL_HD_RESOLUTION.width }) },
    { label: 'UHD', key: JSON.stringify({ width: UHD_RESOLUTION.height, height: UHD_RESOLUTION.width }) },
  ];

  const frameRateItems: MenuProps['items'] = [
    { label: 'Cinematic', key: 24 },
    { label: 'Video', key: 30 },
    { label: 'Slow Motion', key: 60 },
  ];

  const resolutionProps = {
    items: isMobile ? mobileItems : desktopItems,
    onClick: onChangeResolution,
  };

  const frameRateProps = {
    items: frameRateItems,
    onClick: onChangeFrameRate,
  };

  return (
    <>
      {messageDisplay}
      {isPageLoading ? (
        <Spin />
      ) : (
        <Col>
          {image ? (
            <>
              <FaceDetect
                image={image}
                width={width}
                height={height}
                onDetectFace={onDetectFace}
                onRetakeImage={onRetakeImage}
                isFaceLoading={isFaceLoading}
                isMobile={isMobile}
              />
            </>
          ) : (
            <>
              <Row justify="center">
                <Webcam
                  webcamRef={webcamRef}
                  facingMode={facingMode}
                  frameRate={frameRate}
                  width={width}
                  height={height}
                  audio={audio}
                  screenshotFormat={screenshotFormat}
                  forceScreenshotSourceSize={forceScreenshotSourceSize}
                  aspectRatio={isMobile ? (16 / 9) : (9 / 16)}
                />
              </Row>
              <Row justify="center">
                <Space.Compact>
                  <Button
                    size={isMobile ? 'large' : 'middle'}
                    icon={<SwapOutlined />}
                    onClick={onSwitchCamera}
                  >
                    Switch Camera
                  </Button>
                  <Button
                    size={isMobile ? 'large' : 'middle'}
                    icon={<CameraOutlined />}
                    type="primary"
                    onClick={onCaptureImage}
                  >
                    Capture Image
                  </Button>
                </Space.Compact>
              </Row>
              <Row justify="center">
                <Space.Compact>
                  <Dropdown menu={resolutionProps}>
                    <Button
                      size={isMobile ? 'large' : 'middle'}
                    >
                      <Space>
                        Resolution
                        <DownOutlined />
                      </Space>
                    </Button>
                  </Dropdown>
                  <Dropdown menu={frameRateProps}>
                    <Button
                      size={isMobile ? 'large' : 'middle'}
                    >
                      <Space>
                        Frame Rate
                        <DownOutlined />
                      </Space>
                    </Button>
                  </Dropdown>
                </Space.Compact>
              </Row>
            </>
          )}
        </Col>
      )}
    </>
  );
};
