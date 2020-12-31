import React from 'react';
import { connect } from 'react-redux';
import {  Dispatch, bindActionCreators } from 'redux';
import { RootState, RootAction } from 'client/index';
import { push } from 'connected-react-router';
import * as UI from './UI';
import { Container, Section } from 'client/UI/components/Layout';

type Props = {
}
  & ReturnType<typeof mapStateToProps>
  & ReturnType<typeof mapDispatchToProps>;

interface State {}

class User extends React.Component<Props, State> {
  componentDidMount() {
  }

  componentDidUpdate(prevProps: Props) {
  }

  render() {
    const { isAuthenticated, profile } = this.props;

    if (!isAuthenticated) {
      return null;
    }

    return (
      <Container>
        <Section>
          <UI.Title>Profile</UI.Title>
          <UI.Label>Email</UI.Label>
          <UI.Value>{profile?.email || ''}</UI.Value>
        </Section>
      </Container>
    );
  }
}

/* =============================================================================
=    Redux
============================================================================= */
const mapStateToProps = (state: RootState) => ({
  profile: state.user && state.user.profile,
  isAuthenticated: !!state.user.profile,
});
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => bindActionCreators({
  redirect: push,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
