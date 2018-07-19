import React from 'stilren/react';
import TuneValidator from '../TuneValidator';
import ImageMystery from './ImageMystery';

const mysteries = {
  pianoMystery: TuneValidator,
  imageMystery: ImageMystery,
};

export default function Mystery({ sys, fields, onValid }) {
  const type = sys.contentType.sys.id;
  const Component = mysteries[type];
  return <Component {...fields} onValid={onValid} />;
}
