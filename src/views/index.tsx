import React from 'react';
import {
  BrowserRouter,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ismobile from 'src/utils/is-mobile';
import Routes from './screens';
import TemplateMobileView from './screens/template/mobile-view';
import Template from './screens/template';

export default () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Face Recognition</title>
        {ismobile ? (
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        )
          : (
            <meta name="viewport" content="width=500, initial-scale=1.5" />
          )}
      </Helmet>
      <BrowserRouter>
        <TemplateMobileView>
          <Template>
            <Routes />
          </Template>
        </TemplateMobileView>
      </BrowserRouter>
    </>
  );
};
