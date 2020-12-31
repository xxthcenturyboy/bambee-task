import React from 'react';
import styled, { StyledComponentProps }from 'styled-components';
// import zxcvbn from 'zxcvbn';

interface Props {
  ismatch: boolean;
}

export default function PasswordConfBar({ ismatch, ...props }: Props & StyledComponentProps<'div', any, {}, never>) {
  const text = ismatch ? 'Passwords match' : 'Passwords must match';
  return (
    <Container {...props}>
      <Bar ismatch={ismatch} />
      <Text ismatch={ismatch}>{text}</Text>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
`;
const Bar = styled.div<{ ismatch: boolean; }>`
  width: ${p => p.ismatch ? 100 : 50}%;
  background-color: ${(p) => {
    if (p.ismatch) return 'green';
    if (!p.ismatch) return 'red';
    return 'orange';
  }};
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
`;
const Text = styled.span<{ ismatch: boolean; }>`
  position: absolute;
  right: 0;
  top: 3px;
  font-size: 13px;
  color: ${(p) => {
    if (p.ismatch) return 'green';
    if (!p.ismatch) return 'red';
    return 'orange';
  }};
`;
