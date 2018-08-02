import React from 'stilren/react';
import Content from './Content';

import Page from './ContentTypes/Page';

const contents = {
  page: Page,
};

function ContentView({ sys, fields }) {
  if (!sys) {
    return <p>Something went wrong</p>;
  }
  const type = sys.contentType.sys.id;
  const Component = contents[type];
  return <Component {...fields} />;
}

export default function ViewManager() {
  const path = window.location.hash || '/';
  return <Content path={path}>{props => <ContentView {...props} />}</Content>;
}
