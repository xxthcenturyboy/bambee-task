import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { RootState, RootAction } from 'client/index';
import { actions } from 'client/Auth';
import * as UI from './UI';
import { email as emailPattern } from 'shared/regex-patterns';
import isMobile from 'client/lib/browser/is-mobile';

type Props = {
  error: string;
  handleLookup: (event: React.FormEvent) => Promise<void>;
}
  & ReturnType<typeof mapStateToProps>
  & ReturnType<typeof mapDispatchToProps>;

interface State {
}

class Username extends React.Component<Props, State> {
  state = {
  };

  input: HTMLInputElement | null = null;

  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  isSubmitDisabled(): boolean {
    const { username } = this.props;
    return !emailPattern.test(username);
  }

  render() {
    const { username, error, setUsername, handleLookup, isFetchingAuthLookup } = this.props;

    return (
      <UI.Form
        name="form_username"
        onSubmit={(e) => {
          e.preventDefault();
          this.input && this.input.focus();
          handleLookup(e);
        }}
      >
        <UI.FormFields
          style={isMobile() ? { margin: '15 40 0' } : { margin: '20 40 0' }}
        >
          <UI.TextInputWrapper
            style={{ margin: '5 0 0' }}
          >
            <UI.TextInput
              name="username"
              spellCheck={false}
              ref={ref => this.input = ref}
              onChange={e => setUsername(e.target.value)}
              type="email"
              value={username}
              placeholder="Enter your email to start"
            />
          </UI.TextInputWrapper>
        </UI.FormFields>
        <UI.BtnWrapper
          style={{ marginBottom: '35' }}
        >
          <UI.SubmitButton
            type="submit"
            disabled={this.isSubmitDisabled()}
            onClick={(e: React.FormEvent) => {
              this.input && this.input.focus();
              handleLookup(e);
            }}
          >
            {!isFetchingAuthLookup && 'Next'}
            {isFetchingAuthLookup && <UI.Loader />}
          </UI.SubmitButton>
        </UI.BtnWrapper>
        {error && <UI.Error>{error}</UI.Error>}
        {!isMobile() && <UI.Footer />}
      </UI.Form>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  username: state.auth.username,
  isFetchingAuthLookup: state.auth.isFetchingAuthLookup,
  didInvalidateAuthLookup: state.auth.didInvalidateAuthLookup,
});

const mapDispatchToProps = (d: Dispatch<RootAction>) => bindActionCreators({
  setUsername: actions.setUsername,
}, d);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Username);
