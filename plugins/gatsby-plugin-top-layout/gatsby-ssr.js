/* eslint-disable import/prefer-default-export, react/prop-types */

import React from 'react';
import TopLayout from './TopLayout';

import 'typeface-roboto';
import 'typeface-noto-sans';

export const wrapRootElement = ({ element }) => {
  return <TopLayout>{element}</TopLayout>;
};
