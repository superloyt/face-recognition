import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './main';

export default () => (
  <Routes>
    <Route path="/" element={<Landing />} />
  </Routes>
);
