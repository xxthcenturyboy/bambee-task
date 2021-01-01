import React from 'react';
import styled, { css } from 'styled-components';
import { APP_NAME } from 'shared/constants';
import theme from 'client/UI/theme';

const Icon = styled.img`
  width: 40px;
  display: none;

  @media (max-width: 768px) {
    width: 60px;
    display: flex;
  }
`;

const LogoWrap = styled.div`
  margin: auto 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  display: flex;
  font-family: 'Roboto', serif;
  font-weight: 300;
  font-size: 20px;
  text-transform: none;
  // margin: 5px 0 0;
  color: ${theme.colors.grayDark};

  @media (max-width: 768px) {
    display: none;
  }
`;

type LogoProps = {
  isOpen: boolean;
  setMenuState: (state: boolean) => void;
};

const Logo: React.FC<LogoProps> = (props) => {
  return (
    <LogoWrap>
      <Icon src="/img/logo.png" />
      <Title>{APP_NAME}</Title>
    </LogoWrap>
  );
};

export default Logo;
