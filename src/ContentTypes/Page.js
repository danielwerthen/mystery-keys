import React from 'stilren/react';
import MysteryContainer from './MysteryContainer';

function match(item) {
  const date = Date.now();
  const { start, stop } = item.fields;
  if (start && new Date(start) > date) {
    return false;
  }
  if (stop && new Date(stop) < date) {
    return false;
  }

  return true;
}
export default function Page({ content }) {
  const m = content.find(match);
  return m ? <MysteryContainer {...m.fields.content.fields} /> : null;
}
