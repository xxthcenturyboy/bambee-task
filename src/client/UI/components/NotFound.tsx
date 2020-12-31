import * as React from 'react';
import styled from 'styled-components';
interface Props {
}

function NotFound() {
  return (
    <Container>
      <Title>Page Not Found</Title>
      <Description>Sorry we couldn't find what you were looking for.</Description>
      <ButtonContainer>
        <Button href="/" rel="noopener noreferrer">Back to Home</Button>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  display: block;
  padding: 20px;
  background-color: #068ac5;
  background-image: linear-gradient(262deg, hsl(236,60%,66%), hsl(189,64%,55%));
  height: 100%;
  color: white;
  flex-grow: 2;
`;
const Title = styled.div`
  margin-top: 100px;
  font-size: 42px;
  text-align: center;
  width: 100%;
  padding: 20px;
  font-weight: bold;
  @media(max-width: 768px) {
    margin-top: 50px;
  }
`;
const Description = styled.div`
  font-size: 22px;
  text-align: center;
  width: 100%;
  padding: 20px;
  margin-bottom: 20px;
`;
const ButtonContainer = styled.div`
  text-align: center;
`;
const Button = styled.a`
  display: inline-block;
  padding: 15px 20px;
  text-decoration: none;
  color: white;
  border: 1px solid white;
  border-radius: 5px;
`;

export default NotFound;
