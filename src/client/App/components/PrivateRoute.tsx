/* eslint-disable */
import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from 'client/index';
import { BeatLoader } from 'react-spinners';
import * as PI from 'shared/types/preload.interface';
interface Props {
  component: React.ComponentType<any>;
  isAuthenticated: boolean;
  confirmedEmailOnly: boolean;
  isEmailConfirmed: boolean;
  isFetchingProfile: boolean;
  profile: PI.ProfileState;
}

function PrivateRoute({
  component: Component,
  isAuthenticated,
  isFetchingProfile,
  profile,
  confirmedEmailOnly = false,
  isEmailConfirmed,
  ...rest
}: Props) {

  if (!isFetchingProfile && !isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  }

  if (!profile && isFetchingProfile) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 2
        }}
      >
        <BeatLoader
          color="#BDBDBD"
          size={30}
          margin="2px"
        />
      </div>
    );
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        // Redirect if not logged in
        if (!isAuthenticated) {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location }
              }}
            />
          );
        }

        return <Component {...props} />;
      }}
    />
  );
}

const mapStateToProps = (state: RootState, ownProps) => ({
  isAuthenticated: !!(state.user.profile && state.user.profile.id),
  location: ownProps.location,
  isFetchingProfile: state.user.isFetchingProfile,
  profile: state.user.profile,
  isEmailConfirmed: state.user.profile && state.user.profile.isEmailVerified,
});

export default connect(mapStateToProps)(PrivateRoute);
