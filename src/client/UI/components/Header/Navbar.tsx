import React, { useState } from 'react';
import { RootState } from 'client/index';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import NavbarLinks from './NavbarLinks';
import Logo from './Logo';
import theme from 'client/UI/theme';

const Navigation = styled.nav`
  height: 50px;
  display: flex;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  justify-content: center;
  text-transform: uppercase;
  border-bottom: 2px solid #33333320;
  margin: 0 auto;
  padding: 0 12px;
  z-index: 2;
  align-self: center;

  @media (max-width: 768px) {
    height: 80px;
  }
`;

const BoxedWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: 1400px;
  padding: 0 10px;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

const Toggle = styled.div<{ hidden: boolean }>`
  display: none;
  height: 100%;
  cursor: pointer;
  padding: 0 12px;

  @media (max-width: 768px) {
    display: ${p => p.hidden ? 'none' : 'flex'};
  }
`;

const Navbox = styled.div<{ open: boolean}>`
  display: flex;
  height: 100%;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    position: fixed;
    width: 220px;
    justify-content: flex-start;
    padding-top: 20px;
    background-color: ${theme.colors.blueGray};
    transition: all 0.5s ease-in;
    top: 0px;
    align-items: flex-start;
    padding-left: 30px;
    left: ${props => (props.open ? '0' : '-250px')};
    box-shadow: 6px 1px 10px 0px ${theme.colors.gray};
  }
`;

const Hamburger = styled.div<{ open: boolean }>`
  background-color: #111;
  width: 30px;
  height: 3px;
  transition: all 0.3s linear;
  align-self: center;
  position: relative;
  transform: ${props => (props.open ? 'rotate(-45deg)' : 'inherit')};

  ::before,
  ::after {
    width: 30px;
    height: 3px;
    background-color: #111;
    content: '';
    position: absolute;
    transition: all 0.3s linear;
  }

  ::before {
    transform: ${props =>
      props.open ? 'rotate(-90deg) translate(-10px, 0px)' : 'rotate(0deg)'};
    top: -10px;
  }

  ::after {
    opacity: ${props => (props.open ? '0' : '1')};
    transform: ${props => (props.open ? 'rotate(90deg) ' : 'rotate(0deg)')};
    top: 10px;
  }
`;

const Navbar: React.FC = () => {
  const location = useSelector((state: RootState) => state.router.location);
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);

  const { pathname } = location;
  const hideToggle = pathname === '/';

  return (
    <Navigation>
      <BoxedWrapper>
        <Logo isOpen={navbarOpen} setMenuState={setNavbarOpen} />
        <Toggle onClick={() => setNavbarOpen(!navbarOpen)} hidden={hideToggle}>
          <Hamburger open={navbarOpen} />
        </Toggle>
        <Navbox open={navbarOpen}>
          <NavbarLinks isOpen={navbarOpen} setMenuState={setNavbarOpen} />
        </Navbox>
      </BoxedWrapper>
    </Navigation>
  );
};

export default Navbar;
