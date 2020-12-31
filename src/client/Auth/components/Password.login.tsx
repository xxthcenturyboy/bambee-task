import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { RootState, RootAction } from 'client/index';
import { actions } from 'client/Auth';
import * as UI from './UI';
import * as Types from 'client/Auth/types';

type Props = {
  error: string;
  submitLogin: (event: React.FormEvent) => Promise<void>;
  changeView: (view: Types.LoginView) => void;
}
  & ReturnType<typeof mapStateToProps>
  & ReturnType<typeof mapDispatchToProps>;

interface State {
  showPassword: boolean;
}

class PasswordLogin extends React.Component<Props, State> {

  input: HTMLInputElement | null = null;

  state = {
    showPassword: false,
  };

  componentDidMount() {
    this.input && this.input.focus();
  }

  submitBtnDisabled(): boolean {
    const { username, password } = this.props;
    return !(username && password && password.length > 7 && username.length > 2);
  }

  toggleVisibility = () => {
    this.setState({ showPassword: !this.state.showPassword });
  }

  render() {
    const { username, password, error, changeView, submitLogin, setPassword, setUsername } = this.props;

    return (
      <UI.Form
        name="form_login"
        onSubmit={(e) => {
          e.preventDefault();
          submitLogin(e);
        }}
      >
        <UI.Title>Enter your password</UI.Title>
        <UI.Subtitle>to sign in as {username}</UI.Subtitle>
        <UI.FormFields>
          <UI.TextInputWrapper>
            <div
              style={{
                width: 0,
                height: 0,
                opacity: 0,
                pointerEvents: 'none'
              }}
            />
            <UI.TextInput
              name="password"
              ref={ref => this.input = ref}
              type={this.state.showPassword ? 'text' : 'password'}
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="none"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Your password"
            />
            {this.state.showPassword
              ? <UI.VisibilityOff
                onClick={(e: Event) => {
                  e.preventDefault();
                  this.toggleVisibility();
                }}
              />
              : <UI.VisibilityOn
                onClick={(e: Event) => {
                  e.preventDefault();
                  this.toggleVisibility();
                }}
              />
            }
          </UI.TextInputWrapper>
          {/* The field below is hidden so that password manager works */}
          <UI.TextInputWrapper
            style={{
              width: 0,
              height: 0,
              opacity: 0,
              pointerEvents: 'none',
              marginTop: 0
            }}
          >
            <UI.TextInput
              name="username"
              tabIndex={-1}
              type="email"
              spellCheck={false}
              onChange={e => setUsername(e.target.value)}
              value={username}
            />
          </UI.TextInputWrapper>
        </UI.FormFields>
        <UI.BtnWrapper>
          <UI.SubmitButton
            type="submit"
            disabled={this.submitBtnDisabled()}
            onClick={(e: React.FormEvent) => {
              submitLogin(e);
            }}
          >
            Log In
          </UI.SubmitButton>
        </UI.BtnWrapper>
        {error && <UI.Error>{error}</UI.Error>}
        <UI.Footer>
          <UI.FooterTxt
            hasBackButton={true}
            onClick={() => changeView(Types.LoginView.USERNAME)}
          >
            Back
            <UI.ArrowBack />
          </UI.FooterTxt>
        </UI.Footer>
      </UI.Form>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  username: state.auth.username,
  password: state.auth.password,
  isFetchingLogin: state.auth.isFetchingLogin,
  windowWidth: state.app.windowWidth,
});

const mapDispatchToProps = (d: Dispatch<RootAction>) => bindActionCreators({
  setPassword: actions.setPassword,
  setUsername: actions.setUsername,
}, d);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordLogin);
