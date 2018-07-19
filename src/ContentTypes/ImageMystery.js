import React from 'stilren/react';

function isMatching(a, b) {
  if (a && b) {
    return (
      a.replace(' ', '').toLowerCase() === b.replace(' ', '').toLowerCase()
    );
  }
  return false;
}

export default function ImageMystery({ image, password, onValid }) {
  return (
    <div>
      <img
        $display="block"
        $margin="auto"
        $maxWidth="90%"
        src={image.fields.file.url}
        alt={image.fields.title}
      />
      <input
        $background="#EEE"
        $border="1px solid #BBB"
        $borderRadius="5px"
        $fontSize="16px"
        $minWidth="256px"
        $padding="1em"
        $margin="2em"
        type="text"
        onChange={e => isMatching(e.target.value, password) && onValid()}
      />
    </div>
  );
}
