import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

class ScrollToTop extends React.Component<RouteComponentProps<any>> {
  shouldComponentUpdate(nextProps) {
    return this.props.location.pathname !== nextProps.location.pathname;
  }
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }
  render() { return null; }
}

export default withRouter(ScrollToTop);
