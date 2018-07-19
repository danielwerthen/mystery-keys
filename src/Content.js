import React from 'react';
import resolve from 'contentful-resolve-response';
const contentful = require('contentful');

const token =
  '0fa59bb788bc44383340208358280d558743902d8c6f15ebaf2e5b23e0e6f9a9';

const client = contentful.createClient({
  space: 'cf566xzj5m80',
  accessToken: token,
});

export default class Content extends React.Component {
  state = { hasValue: false };
  componentDidMount() {
    client
      .getEntries({
        content_type: 'page',
        'fields.slug':
          this.props.path === '/' ? '/' : this.props.path.substr(1),
        include: 5,
      })
      .then(response => {
        this.setState({
          hasValue: true,
          value: resolve(response),
        });
      });
  }

  render() {
    const { value, hasValue } = this.state;
    return hasValue ? this.props.children(...value) : null;
  }
}
