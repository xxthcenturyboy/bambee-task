// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import theme from 'client/UI/theme';
import muiTheme from 'client/UI/muiTheme';
// import * as selectors from 'client/App/selectors';
import { RootState, RootAction } from 'client/index';
import fetchProfile from 'client/User/actions/fetchProfile';
import Header from 'client/UI/components/Header';
// import settings from 'settings';
import * as PI from 'shared/types/preload.interface';
import { appBootstrap, loginBootstrap } from 'client/lib/bootstrap';
import * as UI from './UI';

// Code splitting
import {
  Auth,
  NotFound,
  PrivateRoute,
  ScrollToTop,
  User,
} from './LazyLoader';

const gradientPaths = ['/'];

interface Props {
  isHeaderVisible: boolean;
  userProfile: PI.ProfileState;
  isFetchingProfile: boolean;
  didInvalidateProfile: boolean;
  fetchProfile: () => any;
  esId: string;
  pathname: string;
  windowWidth: number;
  windowHeight: number;
  isAuthenticated: boolean;
}

class App extends React.Component<Props> {
  componentDidMount() {
    const { userProfile, fetchProfile } = this.props;
    if (!userProfile) {
      fetchProfile();
    }

    appBootstrap();
  }

  componentDidUpdate(prevProps: Props) {
    const { didInvalidateProfile, fetchProfile, userProfile } = this.props;
    if (!prevProps.didInvalidateProfile && didInvalidateProfile) {
      fetchProfile();
    }

    // Logged in
    if (!prevProps.userProfile && userProfile) {
      loginBootstrap();
    }
  }

  render() {
    const {
      pathname,
    } = this.props;

    const StyledThemeProvider = ThemeProvider as any; // incorrect typedef

    const hasGradient = gradientPaths.indexOf(pathname) > -1;

    return (
      <StyledThemeProvider theme={theme}>
        <MuiThemeProvider theme={muiTheme}>
          <UI.AppWrapper hasGradient={hasGradient}>
            <Header />
            <ScrollToTop />
            <UI.ContentWrapper>
              <Switch>
                <Route exact path="/" component={Auth as any} />
                <PrivateRoute exact path="/user" component={User as any} />
                <Route exact path="/404" component={NotFound as any} />
                <Redirect from="*" to="/404" />
              </Switch>
            </UI.ContentWrapper>
          </UI.AppWrapper>
        </MuiThemeProvider>
      </StyledThemeProvider>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return ({
    isFetchingProfile: state.user.isFetchingProfile,
    didInvalidateProfile: state.user.didInvalidateProfile,
    esId: state.app.esId,
    pathname: state.router.location && state.router.location.pathname,
    windowWidth: state.app.windowWidth,
    windowHeight: state.app.windowHeight,
  });
};

const mapDispatchToProps =
  (d: Dispatch<RootAction>) => bindActionCreators({
    fetchProfile,
  }, d);

export default connect(mapStateToProps, mapDispatchToProps)(App);
