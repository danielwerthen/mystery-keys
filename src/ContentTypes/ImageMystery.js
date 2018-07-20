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
  const { file } = image.fields;
  const isVideo = file.contentType.indexOf('video') > -1;
  return (
    <div>
      {isVideo ? (
        <video
          controls
          muted
          src={image.fields.file.url}
          $display="block"
          $margin="auto"
          $maxWidth="90%"
        >
          Sorry, your browser doesn't support embedded videos.
        </video>
      ) : (
        <img
          $display="block"
          $margin="auto"
          $maxWidth="90%"
          src={image.fields.file.url}
          alt={image.fields.title}
        />
      )}
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
