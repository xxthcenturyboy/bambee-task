import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
`;

export const AppWrapper = styled.div<{ hasGradient?: boolean }>`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  background-color: inherit;
  ${(p) => {
    if (p.hasGradient) {
      return `background-image: linear-gradient(64deg,hsl(242,60%,47%) 0%,hsl(205,100%,57%) 73%);`;
    }
  }}
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  opacity: 1;
  animation-duration: 0.3s;
  animation-name: ${fadeIn};
  padding: 80px 20px 0px;
  background-color: inherit;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 100px 10px 0px;
  }
`;
