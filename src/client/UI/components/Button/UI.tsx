import * as React from 'react';
import styled from 'styled-components';
import colors from 'client/UI/colors';

interface Props {
  variant?: string;
  color?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  children: string;
  onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
  width: ${(props: Props) => (props.fullWidth ? '100%' : 'auto')};
  min-width: 7.5em;
  margin: ${(props: Props) => (props.fullWidth ? '8px auto' : '8px')};
  padding: 10px 2.75em;
  border: none;
  border-radius: 3px;
  font-size: 15px;
  font-weight: 400;
  background: ${colors.blueDark};
  cursor: pointer;
  transition: opacity .2s;
  outline: none;
  text-decoration: none;
`;

export const OutlineButton = styled(Button)`
  background: transparent;
  color: ${(props: Props) => (props.color || colors.blueLight)};
  border-color: ${(props: Props) => (props.color || colors.grayLight)};
  box-shadow: none;
`;
