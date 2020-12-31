import React from 'react';
import styled, { StyledComponentProps }from 'styled-components';
import zxcvbn from 'zxcvbn';

interface Props {
  password: string;
}

export default function PasswordStrengthBar({ password, ...props }: Props & StyledComponentProps<'div', any, {}, never>) {
  const result = zxcvbn(password);
  const minScore = 3;
  const value = Math.min(result.score / 3, 1);
  const percent = value * 100;
  let text = 'Too weak';
  if (percent >= 100) {
    text = 'Strong';
  }
  if (password.length < 8) {
    text = 'Password must be at least 8 characters';
  }

  return (
    <Container {...props}>
      <Bar percent={percent} />
      <Text percent={percent}>{text}</Text>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
`;
const Bar = styled.div<{ percent: number; }>`
  width: ${p => p.percent}%;
  background-color: ${(p) => {
    if (p.percent >= 100) return 'green';
    if (p.percent < 50) return 'red';
    return 'orange';
  }};
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
`;
const Text = styled.span<{ percent: number; }>`
  position: absolute;
  right: 0;
  top: 3px;
  font-size: 13px;
  color: ${(p) => {
    if (p.percent >= 100) return 'green';
    if (p.percent < 50) return 'red';
    return 'orange';
  }};
`;
