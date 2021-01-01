import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { RootState, RootAction } from 'client/index';
import { actions } from 'client/Auth';
import * as Types from 'client/Auth/types';
import * as UI from 'client/Auth/components/UI';
import setProfile from 'client/User/actions/setProfile'
import invalidateProfile from 'client/User/actions/invalidateProfile';
import invalidateAuthLookup from 'client/Auth/actions/invalidateAuthLookup';
import requestAuthLookup from 'client/Auth/actions/fetchAuthLookup';
import requestSignup from 'client/Auth/actions/signup';
import requestLogin from 'client/Auth/actions/login';
import { push } from 'connected-react-router';
import Username from './Username';
import PasswordLogin from './Password.login';
import PasswordSignup from './Password.signup';
import { email as emailPattern } from 'shared/regex-patterns';
import { Container, Section } from 'client/UI/components/Layout';

type Props = {
}
  & ReturnType<typeof mapStateToProps>
  & ReturnType<typeof mapDispatchToProps>;

interface State {
  error: string;
}

class Auth extends React.Component<Props, State> {
  state = {
    error: '',
  };

  pwInput: HTMLInputElement = document.createElement('input');
  bodyRoot: HTMLDivElement | null = null;

  componentDidMount() {
    this.changeView(Types.LoginView.USERNAME);
  }

  componentWillUnmount() {
    this.clearInputs();
  }

  componentDidUpdate(prevProps: Props) {
    const {
      isFetchingAuthLookup, isFetchingLogin, isFetchingSignup,
      authLookup, authLookupError, invalidateAuthLookup,
      signupError, signupResponse,
      loginError, loginResponse,
      invalidateProfile, setProfile,
      redirect
    } = this.props;

    // Loading State
    if (
      isFetchingAuthLookup
      || isFetchingLogin
      || isFetchingSignup
    ) {
      return this.changeView(Types.LoginView.LOADING);
    }

    // Auth Lookup Results
    if (prevProps.isFetchingAuthLookup && !isFetchingAuthLookup) {
      if (authLookupError) {
        invalidateAuthLookup();
        this.changeView(Types.LoginView.USERNAME);
        return this.setState({ error: authLookupError });
      }
      if (authLookup && authLookup.exists) {
        return this.changeView(Types.LoginView.PWD_LOGIN);
      }
      return this.changeView(Types.LoginView.PWD_SIGNUP);
    }

    // Signup Results
    if (prevProps.isFetchingSignup && !isFetchingSignup) {
      if (signupError) {
        this.changeView(Types.LoginView.USERNAME);
        return this.setState({ error: signupError });
      }
      if (signupResponse) {
        this.clearInputs();
        setProfile(signupResponse);
        return redirect('/tasks');
      }
      return this.setState({ error: 'Something went wrong signing you up.' });
    }

    // Login Results
    if (prevProps.isFetchingLogin && !isFetchingLogin) {
      if (loginError) {
        invalidateProfile();
        this.changeView(Types.LoginView.USERNAME);
        return this.setState({ error: loginError });
      }
      if (loginResponse) {
        this.clearInputs();
        setProfile(loginResponse);
        return redirect('/tasks');
      }
      return this.setState({ error: 'Something went wrong logging you in.' });
    }
  }

  clearInputs(): void {
    const { setPassword, setPasswordConfirm, setUsername } = this.props;
    setPassword('');
    setPasswordConfirm('');
    setUsername('');
  }

  changeView(view: Types.LoginView): void {
    const { setPassword, setPasswordConfirm, setView } = this.props;

    if (view === Types.LoginView.USERNAME) {
      setPassword('');
      setPasswordConfirm('');
    }

    setView(view);
  }

  handleLoookup = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ error: '' });
    const { requestAuthLookup, username } = this.props;

    if (!username) {
      return this.setState({ error: 'Username Required.' });
    }
    if (!emailPattern.test(username)) {
      return this.setState({ error: 'Username must be email.' });
    }

    try {
      await requestAuthLookup(username);

    } catch (error) {
      this.setState({ error });
    }
  }

  handleLogin = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ error: '' });
    const { requestLogin, username, password } = this.props;

    try {
      await requestLogin({ email: username, password });

    } catch (error) {
      this.setState({ error });
    }
  }

  handleSignup = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ error: '' });
    const { requestSignup, username, password, passwordConfirm } = this.props;

    if (password !== passwordConfirm) {
      return this.setState({ error: 'Passwords must match' });
    }

    try {
      await requestSignup({ email: username, password, passwordConfirm });

    } catch (error) {
      this.setState({ error });
    }
  }

  renderActiveView() {
    const { view } = this.props;
    const { error } = this.state;

    switch (view) {
      case Types.LoginView.USERNAME: {
        return (
          <Username
            error={error}
            handleLookup={this.handleLoookup}
          />
        );
      }
      case Types.LoginView.PWD_LOGIN: {
        return (
          <PasswordLogin
            error={error}
            submitLogin={this.handleLogin}
            changeView={(view: Types.LoginView) => this.changeView(view)}
          />
        );
      }
      case Types.LoginView.PWD_SIGNUP: {
        return (
          <PasswordSignup
            error={error}
            changeView={(view: Types.LoginView) => this.changeView(view)}
            submitSignup={this.handleSignup}
          />
        );
      }
      case Types.LoginView.LOADING: {
        return (
          <UI.LoaderWrapper>
            <UI.Loader />
          </UI.LoaderWrapper>
        );
      }
      default: return null;
    }
  }

  render() {
    const { user, view } = this.props;
    const logo = '/img/logo.png';

    if (user) {
      return <Redirect to="/tasks" />;
    }

    return (
      <Container>
        <UI.AuthWrapper>
          <UI.Body
            ref={(ref) => {
              if (ref) { this.bodyRoot = ref; }
            }}
            isEnterPassword={view === Types.LoginView.PWD_LOGIN}
          >
            <UI.MastHead>
              <UI.Logo src={logo} />
            </UI.MastHead>
            {this.renderActiveView()}
          </UI.Body>
        </UI.AuthWrapper>
      </Container>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  view: state.auth.loginView,
  username: state.auth.username,
  password: state.auth.password,
  passwordConfirm: state.auth.passwordConfirm,
  isFetchingAuthLookup: state.auth.isFetchingAuthLookup,
  didInvalidateAuthLookup: state.auth.didInvalidateAuthLookup,
  authLookupError: state.auth.authLookupError,
  authLookup: state.auth.authLookup,
  isFetchingLogin: state.auth.isFetchingLogin,
  loginError: state.auth.loginError,
  loginResponse: state.auth.loginResponse,
  isFetchingSignup: state.auth.isFetchingSignup,
  signupError: state.auth.signupError,
  signupResponse: state.auth.signupResponse,
  user: state.user.profile,
  location: state.router.location,
});

const mapDispatchToProps = (d: Dispatch<RootAction>) => bindActionCreators({
  invalidateProfile,
  invalidateAuthLookup,
  redirect: to => push(to),
  setView: actions.setLoginView,
  setUsername: actions.setUsername,
  setPassword: actions.setPassword,
  setPasswordConfirm: actions.setPasswordConfirm,
  requestAuthLookup,
  requestSignup,
  requestLogin,
  setProfile
}, d);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
