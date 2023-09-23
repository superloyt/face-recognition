/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  Row, Button, Space, Spin,
} from 'antd';
import { CameraOutlined, SmileOutlined, LoadingOutlined } from '@ant-design/icons';
import { IProps } from './props';
import './styles.css';

export default (props: IProps) => {
  const {
    image, width, height, isFaceLoading,
    onDetectFace, onRetakeImage,
  } = props;
  return (
    // <>
    //   {isFaceLoading ? (
    //     <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    //   ) : (
    //     <>
    //       <Row justify="center">
    //         <img id="imagePreview" src={image} alt="Preview" style={{ width, height }} />
    //         <canvas id="faceDetection" />
    //       </Row>
    //       <Row justify="center">
    //         <Space.Compact>
    //           <Button
    //             icon={<CameraOutlined />}
    //             onClick={onRetakeImage}
    //           >
    //             Retake Image
    //           </Button>
    //           <Button
    //             type="primary"
    //             icon={<SmileOutlined />}
    //             onClick={onDetectFace}
    //           >
    //             Detect Face
    //           </Button>
    //         </Space.Compact>
    //       </Row>
    //     </>
    //   )}
    // </>
    <>
      <Row justify="center">
        <img id="imagePreview" src={image} alt="Preview" style={{ width, height }} />
        <canvas id="faceDetection" />
      </Row>
      <Row justify="center">
        <Space.Compact>
          <Button
            icon={<CameraOutlined />}
            onClick={onRetakeImage}
          >
            Retake Image
          </Button>
          <Button
            type="primary"
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
