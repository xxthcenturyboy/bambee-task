import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { RootState, RootAction } from 'client/index';
import { actions } from 'client/Auth';
import * as UI from './UI';
import * as Types from 'client/Auth/types';
import PasswordStrengthBar from './PasswordStrengthBar';
import PasswordConfBar from './PasswordConfBar';

type Props = {
  error: string;
  submitSignup: (event: React.FormEvent) => Promise<void>;
  changeView: (view: Types.LoginView) => void;
}
  & ReturnType<typeof mapStateToProps>
  & ReturnType<typeof mapDispatchToProps>;

interface State {
  showPassword: boolean;
  showConfirmPassword: boolean;
  touchedPassword: boolean;
  touchedConfirmPassword: boolean;
}

class PasswordSignup extends React.Component<Props, State> {

  input: HTMLInputElement | null = null;

  state = {
    showPassword: false,
    showConfirmPassword: false,
    touchedPassword: false,
    touchedConfirmPassword: false,
  };

  componentDidMount() {
    this.input && this.input.focus();
  }

  componentDidUpdate(prevProps: Props) {
  }

  submitBtnDisabled(): boolean {
    const { username, password, passwordConfirm } = this.props;
    return !(username && password && passwordConfirm && password === passwordConfirm);
  }

  toggleVisibility = () => {
    this.setState({ showPassword: !this.state.showPassword });
  }

  toggleVisibilityConfirm = () => {
    this.setState({ showConfirmPassword: !this.state.showConfirmPassword });
  }

  render() {
    const { username, password, passwordConfirm, error, changeView, submitSignup, setPassword, setPasswordConfirm } = this.props;
    const { showPassword, showConfirmPassword, touchedPassword, touchedConfirmPassword } = this.state;

    return (
      <UI.Form
        name="form_signup"
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          submitSignup(e);
        }}
      >
        <UI.Title>Choose a Password</UI.Title>
        <UI.Subtitle>{username}</UI.Subtitle>
        <UI.FormFields>
          <UI.TextInputWrapper>
            <div style={{ opacity: 0, height: 0, width: 0 }} />
            <UI.TextInput
              ref={(ref) => { if (ref) { this.input = ref; } }}
              name="password"
              type={showPassword ? 'text' : 'password'}
              onBlur={() => this.setState({ touchedPassword: true })}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                this.setState({ touchedPassword: true });
              }}
              placeholder="Your password"
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="none"
            />
            {showPassword
              ? <UI.VisibilityOff
                onClick={(e) => {
                  e.preventDefault();
                  this.toggleVisibility();
                }}
              />
              : <UI.VisibilityOn
                onClick={(e) => {
                  e.preventDefault();
                  this.toggleVisibility();
                }}
              />
            }
            {!error && password.length > 0 && touchedPassword && <PasswordStrengthBar password={password} />}
          </UI.TextInputWrapper>
          <UI.TextInputWrapper>
            <UI.TextInput
              name="password_confirm"
              type={showConfirmPassword ? 'text' : 'password'}
              onBlur={() => this.setState({ touchedConfirmPassword: true })}
              value={passwordConfirm}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
                this.setState({ touchedConfirmPassword: true });
              }}
              placeholder="Confirm password"
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="none"
            />
            {showConfirmPassword
              ? <UI.VisibilityOff
                onClick={(e) => {
                  e.preventDefault();
                  this.toggleVisibilityConfirm();
                }}
              />
              : <UI.VisibilityOn
                onClick={(e) => {
                  e.preventDefault();
                  this.toggleVisibilityConfirm();
                }}
              />
            }
            {!error && password.length >= 8 && touchedConfirmPassword && <PasswordConfBar ismatch={password === passwordConfirm} />}
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
              readOnly
              value={username}
            />
          </UI.TextInputWrapper>
          {error &&
            <UI.Error>
              {error}
            </UI.Error>
          }
        </UI.FormFields>
        <UI.BtnWrapper
          style={{ marginTop: '20' }}
        >
          <UI.SubmitButton
            type="submit"
            disabled={this.submitBtnDisabled()}
            onClick={(e: React.FormEvent) => {
              submitSignup(e);
            }}
          >
            Sign Up
          </UI.SubmitButton>
        </UI.BtnWrapper>
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
  passwordConfirm: state.auth.passwordConfirm,
  isFetchingSignup: state.auth.isFetchingSignup,
  windowWidth: state.app.windowWidth,
});

const mapDispatchToProps = (d: Dispatch<RootAction>) => bindActionCreators({
  setUsername: actions.setUsername,
  setPassword: actions.setPassword,
  setPasswordConfirm: actions.setPasswordConfirm,
}, d);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordSignup);
