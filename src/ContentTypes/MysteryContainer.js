import React from 'stilren/react';

export default function MysteryContainer({ title, description }) {
  return (
    <div>
      {title && <h1>{title}</h1>}
      {description && <p>{description}</p>}
    </div>
  );
}
