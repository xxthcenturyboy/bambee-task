import React from 'react';
import styled from 'styled-components';
import theme from 'client/UI/theme';

export function NoData() {
  return (
    <Container>
      <Title>You're all caught up!</Title>
      <Description>
        Add more To-Dos
      </Description>
      <Image src="/img/no-items-2x.png" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  background: ${theme.colors.white};
  height: 100%;
  padding: 50px;
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
const Description = styled.h5`
  text-align: center;
  font-size: 14px;
  color: ${theme.colors.blueDark};
  margin-top: 15px;
`;
