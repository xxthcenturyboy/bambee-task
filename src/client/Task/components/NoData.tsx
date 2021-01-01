import React from 'react';
import styled from 'styled-components';
import theme from 'client/UI/theme';

export function NoData() {
  return (
    <Container>
      <Title>You're all caught up!</Title>
      <Image src="/img/no-items-2x.png" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const Image = styled.img`
  margin-top: 30px;
  width: auto;
  height: 200px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  color: ${theme.colors.blueDark};
`;
