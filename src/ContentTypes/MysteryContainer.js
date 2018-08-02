import React from 'stilren/react';
import Mystery from './Mystery';

function navTo(page) {
  return () => {
    setTimeout(() => {
      window.location.hash = page ? page.fields.slug : '';
      window.location.reload();
    }, 500);
  };
}

export default function MysteryContainer({
  title,
  description,
  mystery,
  nextPage,
}) {
  return (
    <div>
      {title && <h1>{title}</h1>}
      {description && <p>{description}</p>}
      <Mystery {...mystery} onValid={navTo(nextPage)} />
    </div>
  );
}
