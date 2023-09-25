/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  Row, Button, Space, Spin,
} from 'antd';
import { CameraOutlined, SmileOutlined } from '@ant-design/icons';
import { IProps } from './props';
import './styles.css';

export default (props: IProps) => {
  const {
    image, width, height, isFaceLoading,
    onDetectFace, onRetakeImage, isMobile,
  } = props;
  return (
    <>
      <Row justify="center">
        <img
          id="imagePreview"
          src={image}
          alt="Preview"
          style={{ width: `${width}px`, height: `${height}px`, objectFit: 'contain' }}
        />
        <canvas id="faceDetection" />
      </Row>
      <Row justify="center">
        <Space.Compact>
          <Button
            size={isMobile ? 'large' : 'middle'}
            icon={<CameraOutlined />}
            onClick={onRetakeImage}
          >
            Retake Image
          </Button>
          <Button
            type="primary"
            size={isMobile ? 'large' : 'middle'}
            icon={<SmileOutlined />}
            onClick={onDetectFace}
            loading={isFaceLoading}
          >
            Detect Face
          </Button>
        </Space.Compact>
      </Row>
    </>
  );
};
