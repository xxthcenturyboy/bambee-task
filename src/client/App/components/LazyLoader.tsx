import Loadable from 'react-loadable';
import Loading from 'client/UI/components/Loading';

export const Auth = Loadable({
  loader: (): any => import('client/Auth/components/Auth'),
  loading: Loading
});

export const NotFound = Loadable({
  loader: (): any => import('client/UI/components/NotFound'),
  loading: Loading
});

export const PrivateRoute = Loadable({
  loader: (): any => import('client/App/components/PrivateRoute'),
  loading: Loading
});

export const ScrollToTop = Loadable({
  loader: (): any => import('client/UI/components/ScrollToTop'),
  loading: (): any => null
});

export const User = Loadable({
  loader: (): any => import('client/User/components/User'),
  loading: Loading
});
