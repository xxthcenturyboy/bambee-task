import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
`;
export const Container = styled.div`
  margin: 0;
  opacity: 1;
  animation-duration: 0.3s;
  animation-name: ${fadeIn};
`;

export const Section = styled.div`
  background-color: white;
  padding: 20px 20px 50px;
  border-radius: 10px;
  box-shadow: 0px 0px 4px 0px #88888887;

  @media(max-width: 768px) {
  }
`;
