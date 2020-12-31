import React from 'react';
import { RootState } from 'client/index';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import fetchLogout from 'client/Auth/actions/logout';
import { actions } from 'client/User';
import styled from 'styled-components';
import theme from 'client/UI/theme';

const NavItem = styled.div`
  text-decoration: none;
  display: inline-block;
  white-space: nowrap;
  margin: 0 0 0 1vw;
  transition: all 200ms ease-in;
  position: relative;
  font-size: 0.85rem;

  :after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 0%;
    content: '.';
    color: transparent;
    background: ${theme.colors.blueGray};
    height: 1px;
    transition: all 0.4s ease-in;
  }

  :hover {
    color: ${theme.colors.blueGray};
    ::after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    padding: 20px 0 0;
    margin-bottom: 20px;
    font-size: 1.25rem;
    z-index: 6;
    width: 80%;
  }
`;

const StyledLink = styled(({ isCurrent, ...rest }) => <NavItem {...rest} />)(
  ({ isCurrent }) => ({
    color: isCurrent ? theme.colors.blueDark : theme.colors.gray,
    ':hover': {
      color: isCurrent ? theme.colors.blueLight : theme.colors.blueGray,
      cursor: isCurrent ? 'default' : 'pointer',
    },
    ':after': {
      background: isCurrent ? theme.colors.blueLight : theme.colors.blueGray,
      width: isCurrent ? '100%' : '0',
      transition: isCurrent ? 'none' : 'all 0.4s ease-in',
    },
  })
);

const routes = [
  {
    title: 'Log Out',
    path: '/',
  },
];

type NavbarLinkProps = {
  isOpen: boolean;
  setMenuState: (state: boolean) => void;
};

const NavbarLinks: React.FC<NavbarLinkProps> = (props) => {
  const dispatch = useDispatch();
  const location = useSelector((state: RootState) => state.router.location);
  const isAuthenticated = useSelector((state: RootState) => !!state.user.profile);
  const logoutResponse = useSelector((state: RootState) => state.auth.logoutResponse);
  const { isOpen, setMenuState } = props;
  const { pathname } = location;

  React.useEffect(() => {
    if (logoutResponse) {
      dispatch(actions.setProfile(null));
      dispatch(push('/'));
    }
  }, [logoutResponse]);

  const logout = async (): Promise<void> => {
    try {
      await dispatch(fetchLogout());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {routes.map((route) => {
        if (isAuthenticated) {
          return (
            <StyledLink
              key={route.title}
              isCurrent={pathname === route.path}
              onClick={() => {
                if (route.title === 'Log Out') {
                  logout();
                } else {
                  dispatch(push(route.path));
                }

                if (isOpen) {
                  setMenuState(false);
                }
              }}
            >
              {route.title}
            </StyledLink>
          );
        }
      })}
    </>
  );
};

export default NavbarLinks;
